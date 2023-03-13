<script>
	let screen;
	let foldsWrapper;
	let center;
	let bottom;
	let top;
	let baseContent;
	$: outerWidth = 0;
	$: innerWidth = 0;
	$: outerHeight = 0;
	$: innerHeight = 0;

	let state = {
		disposed: false,
		targetScroll: 0,
		scroll: 0,
		mouse: {
			x: 0,
			y: 0
		},
		follower: {
			x: 0,
			y: 0
		},
		followerVelocity: {
			x: 0,
			y: 0
		}
	};

	function lerp(current, target, speed = 0.1, limit = 0.001) {
		let change = (target - current) * speed;
		if (Math.abs(change) < limit) {
			change = target - current;
		}
		return change;
	}

	class FoldedDom {
		constructor(wrapper, folds = null, scrollers = null) {
			this.wrapper = wrapper;
			this.folds = folds;
			this.scrollers = [];

			this.scale = [1, 1];
		}
		setContent(baseContent, createScrollers = true) {
			const folds = this.folds;
			if (!folds) return;

			let scrollers = [];

			for (let i = 0; i < folds.length; i++) {
				const fold = folds[i];
				const copyContent = baseContent.cloneNode(true);
				copyContent.id = '';
				let scroller;
				if (createScrollers) {
					scroller = document.createElement('div');
					scroller.classList.add('fold-scroller');
					fold.append(scroller);
				} else {
					scroller = this.scrollers[i];
				}
				scroller.append(copyContent);

				scrollers[i] = scroller;
			}
			this.scrollers = scrollers;
		}
		updateScrollStyles(scroll, skewAmp, rotationAmp) {
			const folds = this.folds;
			const scrollers = this.scrollers;
			let centerIndex = Math.floor(folds.length / 2);
			let scrollFix = centerIndex * -100;

			const centerFold = this.folds[centerIndex];

			for (let i = 0; i < folds.length; i++) {
				const centerRelativeIndex = i - centerIndex;

				const fold = folds[i];
				const scroller = scrollers[i];
				let percentage = `${scrollFix - centerRelativeIndex * 100 + 100}%`;
				let pixels = 0;
				let translateY = percentage;

				if (centerRelativeIndex > 0) {
					// The bottom folds, start at some place in the center(exactly height of middle folds).
					// So to sync it up it needs to use pixels of the content instead.
					pixels += -centerFold.offsetHeight;
					translateY = `${pixels}px`;
				}

				// Scroller fixed so its aligned
				// scroller.style.transform = `translateY(${100 * -i}%)`;
				// And the content is the one that scrolls
				let scale = 1;
				if (i === 0 || i === 2) {
					scale = this.scale[i / 2];
				}
				scroller.style.transform = `translateY(${translateY}) scaleY(${scale})`;
				scroller.children[0].style.transform = `translateY(${scroll}px)`;
			}
		}
		updateFoldTransforms() {
			let y, x;

			x = state.follower.x * innerWidth * 0.25;
			y = state.follower.y * innerHeight * 0.25;

			foldsWrapper.style.transform = `translate(${x}px, ${y}px)`;

			this.scale = [];
			let scales = this.scale;

			function getTransform(from, to, reverseRotation = false) {
				// [] - Not quite sure why it doesn't work like the bottoone
				//It seems like it grows in the incorrect way, copying the bottom one.
				// As it gets closer it needs to increase, and as it moves away it needs to decrease
				let relX = to.x - from.x;
				let relY = to.y - from.y;
				let relZ = to.z - from.z;

				let xAngle = Math.atan2(relZ, relY);
				if (reverseRotation) {
					xAngle = Math.atan2(relY, relZ);
				}
				/* 
    After a few years of work. 
      1- Make sure the perspective origin is at the right place.  
          Each fold needs it's own perspective plane
          - Top fold:  perspective: 50% 100%. AKA, at it's bottom
          - bottom fold:  perspective: 50% 0%. AKA, at it's top

      2. Make the rotationX angle negavite and move it by 90deg
              Why? not sure. It works

    */

				// This takes care of positioning the correct part of the plane on the corner.
				// It can't always be the end of the plane because that grows as the rotation changes.
				// This finds the correct spot that matches the window's width

				let xAngleDegrees = (xAngle / Math.PI) * 180;
				if (reverseRotation) {
					xAngleDegrees = -xAngleDegrees - 90;
				}

				//
				const zyLength = length(relZ, relY);

				// Althought the rotation doesn't quite place the end at the bottom
				// Scaling it after all transforms does do the trick
				let scale = zyLength / innerHeight;

				let skewAngle = Math.atan2(-relY, relX);
				let skewAngleDegrees = ((skewAngle + Math.PI / 2) / Math.PI) * 180;
				scales.push(1 / scale);

				return `skewX(${skewAngleDegrees}deg) rotate3d(1,0, 0,${
					xAngleDegrees + 0
				}deg) scale3d(1,${scale},1)`;
			}

			let centerRect = center.getBoundingClientRect();
			const centerX = centerRect.left + centerRect.width / 2;
			const centerYtop = centerRect.top;
			const centerYbottom = centerRect.top + centerRect.height;
			const centerZ = 0;

			let toX = innerWidth / 2;
			let topY = 0;
			let bottomY = innerHeight;
			// The size of the bottom thing is around 50vh weird
			// Welp, the perspective is window.innerHeight. So I think that's why
			let toZ = innerHeight;

			let bottomTransform = getTransform(
				{
					x: centerX,
					y: centerYbottom,
					z: centerZ
				},
				{
					x: toX,
					y: bottomY,
					z: toZ
				}
			);
			// Parameters seem fine
			let topTransform = getTransform(
				{
					x: centerX,
					y: centerYtop,
					z: centerZ
				},
				{
					x: toX,
					y: topY,
					z: toZ
				},
				true
			);

			bottom.style.transform = bottomTransform;
			top.style.transform = topTransform;
		}
	}

	const length = (x, y, z = 0) => Math.sqrt(x * x + y * y + z * z);

	let insideFold;

	let tick = () => {
		if (state.disposed) return;

		// // Calculate the scroll based on how much the content is outside the centerFold
		// document.body.style.height =
		// 	insideFold.scrollers[0].children[0].clientHeight - center.clientHeight + innerHeight + 'px';

		// Make it mouse bouncy with a spring
		let spring = 0.01;
		// let spring = 0.03 (original)
		let friction = 0.8;
		// let friction = 0.75 (original)

		let relMouse = {
			x: (state.mouse.x - state.follower.x) * spring,
			y: (state.mouse.y - state.follower.y) * spring
		};
		state.followerVelocity.x = (state.followerVelocity.x + relMouse.x) * friction;
		state.followerVelocity.y = (state.followerVelocity.y + relMouse.y) * friction;
		state.follower.x += state.followerVelocity.x;
		state.follower.y += state.followerVelocity.y;

		state.targetScroll = 0;

		state.scroll += lerp(state.scroll, state.targetScroll, 0.1, 0.0001);

		insideFold.updateScrollStyles(state.scroll);
		insideFold.updateFoldTransforms();

		requestAnimationFrame(tick);
	};

	//  EVENTS
	let onMouseMove = (ev) => {
		state.mouse.x = ev.clientX / innerWidth;
		state.mouse.y = ev.clientY / innerHeight;

		let mouseX = state.mouse.x * 2 - 1;
		let mouseY = state.mouse.y * 2 - 1;

		// Do the length clamping directly on the mouse so the bounce effect happens even out
		// of bounce(outside of min length)

		let mouseLen = Math.min(0.5, length(mouseX, mouseY));
		let mouseAngle = Math.atan2(mouseY, mouseX);

		state.mouse.x = Math.cos(mouseAngle) * mouseLen;
		state.mouse.y = Math.sin(mouseAngle) * mouseLen;
	};
	let onTouchMove = (ev) => {
		onMouseMove(ev.touches[0]);
	};

	insideFold = new FoldedDom(foldsWrapper, [top, center, bottom]);
	insideFold.setContent(baseContent);
	tick();
</script>

<svelte:window
	bind:innerWidth
	bind:outerWidth
	bind:innerHeight
	bind:outerHeight
	on:mousemove={onMouseMove}
	on:touchmove={onTouchMove}
/>

<div class="content">
	<div class="fold-content" id="base-content" bind:this={baseContent}>
		<!-- CONTENT INSIDE HERE -->
		<h2 class="content__headline">Utopian dreamer</h2>
		<p class="content__type">
			The Utopia of a modern dreamer must needs differ in one fundamental aspect from the Nowheres
			and Utopias men planned before Darwin quickened the thought of the world.
		</p>
		<img class="content__img" src="img/18.jpg" alt="Some image" />
		<h2 class="content__headline">All perfect</h2>
		<p class="content__type">
			Those were all perfect and static States, a balance of happiness won for ever against the
			forces of unrest and disorder that inhere in things. One beheld a healthy and simple
			generation enjoying the fruits of the earth in an atmosphere of virtue and happiness, to be
			followed by other virtuous, happy, and entirely similar generations, until the Gods grew
			weary.
		</p>
		<img class="content__img" src="img/19.jpg" alt="Some image" />
		<h2 class="content__headline">Invincible dams</h2>
		<p class="content__type">
			Change and development were dammed back by invincible dams for ever. But the Modern Utopia
			must be not static but kinetic, must shape not as a permanent state but as a hopeful stage,
			leading to a long ascent of stages.
		</p>
		<img class="content__img" src="img/20.jpg" alt="Some image" />
		<h2 class="content__headline">Do not resist</h2>
		<p class="content__type">
			Nowadays we do not resist and overcome the great stream of things, but rather float upon it.
			We build now not citadels, but ships of state. For one ordered arrangement of citizens
			rejoicing in an equality of happiness safe and assured to them and their children for ever, we
			have to plan "a flexible common compromise, in which a perpetually novel succession of
			individualities may converge most effectually upon a comprehensive onward development."
		</p>
		<img class="content__img" src="img/21.jpg" alt="Some image" />
		<h2 class="content__headline">Modern conceptions</h2>
		<p class="content__type">
			That is the first, most generalised difference between a Utopia based upon modern conceptions
			and all the Utopias that were written in the former time.
		</p>
	</div>
	<div class="screen" bind:this={screen}>
		<div class="folds" id="folds" bind:this={foldsWrapper}>
			<div class="fold fold-center" id="fold-center" bind:this={center} />
			<div class="fold-3d fold-3d-top top-wrapper">
				<div class="fold fold-top" id="fold-top" bind:this={top} />
			</div>
			<div class="fold-3d fold-3d-bottom bottom-wrapper">
				<div class="fold fold-bottom" id="fold-bottom" bind:this={bottom} />
			</div>
		</div>
	</div>
</div>

<style>
	.screen {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		pointer-events: none;
	}

	.fold-scroller {
		height: 100%;
	}

	.fold-content {
		pointer-events: all;
		width: 100%;
	}

	.fold-size-fix {
		width: 100%;
		height: 100%;
	}

	.fold-before .fold-size-fix {
		transform-origin: bottom center;
	}

	.fold-after .fold-size-fix {
		transform-origin: top center;
	}

	a:hover,
	a:focus {
		text-decoration: underline;
	}

	.frame {
		color: #a5271b;
		font-weight: 500;
	}

	.frame__title,
	.frame {
		font-size: 1.3rem;
	}

	.content__headline {
		font-size: 0.9rem;
		margin: 2rem 0 1rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.content__type {
		font-size: 2.5vw;
		margin: 3rem auto 5rem;
		line-height: 1.25;
		font-weight: 300;
		backface-visibility: hidden;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: -moz-none;
		-o-user-select: none;
		user-select: none;
		background-size: 80%;
	}

	.content__img {
		max-width: 100%;
		display: block;
		margin: 0 auto 5rem;
		backface-visibility: hidden;
	}

	/* Effect Styles */

	.folds {
		position: relative;
		transform-style: preserve-3d;
	}

	.fold-3d {
		position: absolute;
		left: 0;
		right: 0;
		perspective: 100vh;
		transform-style: preserve-3d;
	}

	.fold-3d-top {
		bottom: 100%;
		perspective-origin: 50% 100%;
	}
	.fold-3d-bottom {
		top: 100%;
		/* Origin at the top of the bottom wrapper, the bottom of the center fold. */
		perspective-origin: 50% 0%;
	}
	.debug .fold-top {
		background: #dadada;
	}
	.debug .fold-bottom {
		background: #dadada;
	}
	.debug .test-center {
		background: #bababa;
	}
	.fold-bottom {
		height: 50vh;
		width: 100%;
		/* background: #ff000090; */
		transform-origin: top center;
	}
	.fold-top {
		height: 50vh;
		width: 100%;
		/* background: #ff000090; */
		transform-origin: bottom center;
	}
	.fold-top .fold-scroller {
		transform-origin: top center;
	}
	.fold-bottom .fold-scroller {
		transform-origin: top center;
	}
	.fold-center {
		height: 50vh;
		width: 50vw;
	}

	.fold {
		overflow: hidden;
		/* border: 1px solid #000; */
	}
	.fold-scroller {
		display: flex;
		flex-direction: column;
	}

	.fold-content {
		padding: 0 2rem;
	}
</style>
