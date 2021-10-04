import { Block } from './types/notion';
export declare function createLine(str: string): string;
export declare function createText(block: Block): string;
export declare function createHeading(block: Block): string;
export declare function createList(block: Block): string;
export declare function createOrderList(block: Block): string;
export declare function createImage(block: Block): string;
export default function build(blocks: Block[]): string;
