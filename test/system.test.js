import test from 'node:test';
import assert from 'node:assert/strict';
import { System } from '../src/System.js';
import { Data } from '../src/Data.js';
import { SystemNode } from '../src/SystemNode.js';
import { User } from '../src/User.js';

// Test sorting of data

test('sortData sorts by id', () => {
  const sys = new System([], [], [new Data(2, 10), new Data(1, 10)]);
  const sorted = sys.sortData();
  assert.strictEqual(sorted[0].id, 1);
  assert.strictEqual(sorted[1].id, 2);
});

// Test free memory computation

test('freeMemory returns available space', () => {
  const nodes = [new SystemNode(1, 50, [0], [], [])];
  const data = [new Data(0, 10)];
  const sys = new System([], nodes, data);
  assert.strictEqual(sys.freeMemory(1), 40);
});
