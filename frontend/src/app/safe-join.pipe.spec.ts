import { SafeJoinPipe } from './safe-join.pipe';

describe('SafeJoinPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeJoinPipe();
    expect(pipe).toBeTruthy();
  });
});
