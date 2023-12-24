import { Config } from './config';
import * as Phaser from 'phaser';

const width = window.innerWidth;
const height = window.innerHeight;
const config = Config(width, height);
const game = new Phaser.Game(config);
