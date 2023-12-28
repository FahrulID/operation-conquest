import Scenes from './scenes/scenes';
import * as Phaser from 'phaser';
import Plugins from './plugins/plugin';

var Config = (function (width: number, height: number) {
    return {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'game-parent',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: width,
            height: height
        },
        render: {
            batchSize: 1024,
            maxTextures: 15
        },
        fps: {
            target: 60,
            forceSetTimeOut: true
        },
        backgroundColor: '#000000',
        scene: Scenes,
        plugins: Plugins,
        dom: {
            createContainer: true
        }
    };
})

export { Config }; 