export const globals = {
	entered: !1,
	echoesOpened: !1,
	musicQueue: [],
	allowBeat: true
};
export const sfx = {
	enterTension: new Howl({
		src: ["../../assets/sfx/medium-pitch-click-impact.ogg"],
		loop: !1,
		volume: 1
	}),
	echoesOpen: new Howl({
		src: ["../../assets/sfx/echoe-deep-impact.ogg"],
		loop: !1,
		volume: 1
	}),
	typewritterTyping: new Howl({
		src: ["../../assets/sfx/typewriter-typing.ogg"],
		loop: !1,
		volume: .8
	})
};
export const ambient = {
	landingAmbient: new Howl({
		src: ["../../assets/music/ambient/landing-ambient.ogg"],
		loop: !1,
		volume: 1
	}),
	echoesAmbient: new Howl({
		src: ["../../assets/music/ambient/underwater-blured-low-noise.ogg"],
		loop: !1,
		volume: 1
	}),
	lowRadioNoise: new Howl({
		src: ["../../assets/music/ambient/low-radio-noise.ogg"],
		loop: !0,
		volume: 1
	}),
	sadDramaticHopeless: new Howl({
		src: ["../../assets/music/ambient/sad-dramatic-hopeless.ogg"],
		loop: !1,
		volume: 1
	}),
	tensionSpatialDramatic: new Howl({
		src: ["../../assets/music/ambient/tension-spatial-dramatic.ogg"],
		loop: !1,
		volume: 1
	}),
	foggySpooky: new Howl({
		src: ["../../assets/music/ambient/foggy-spooky-eerie.ogg"],
		loop: !1,
		volume: 1
	})
};
export const music = {
	nightSpringsRemix: new Howl({
		src: ["../../assets/music/Night Springs Remix.ogg"],
		loop: !1,
		volume: 1
	}),
	yotonYoNonVocal: new Howl({
		src: ["../../assets/music/Yötön Yö (non vocal-radio).ogg"],
		loop: !1,
		volume: 1
	}),
	sadMelodicalVibe: new Howl({
		src: ["../../assets/music/Sad Melodical Low Vibe.ogg"],
		loop: !1,
		volume: 1
	}),
	yotonYoVocal: new Howl({
		src: ["../../assets/music/Yötön Yö (vocal-radio).ogg"],
		loop: !1,
		volume: 1
	}),
	chillingUniverse: new Howl({
		src: ["../../assets/music/Chilling In Universe (non vocal - original).ogg"],
		loop: !1,
		volume: 1
	})
};