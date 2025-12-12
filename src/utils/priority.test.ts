import { getPriorityMeta, getPriorityOptions } from './priority';
import { TaskPriority } from '../model/task_model';

describe('getPriorityMeta', () => {
  it('should return correct meta for low priority', () => {
    const result = getPriorityMeta(TaskPriority.low);
    expect(result).toEqual({ label: 'Low', className: 'low' });
  });

  it('should return correct meta for medium priority', () => {
    const result = getPriorityMeta(TaskPriority.medium);
    expect(result).toEqual({ label: 'Medium', className: 'medium' });
  });

  it('should return correct meta for high priority', () => {
    const result = getPriorityMeta(TaskPriority.high);
    expect(result).toEqual({ label: 'High', className: 'high' });
  });

  it('should return high priority for unknown values (default case)', () => {
    const result = getPriorityMeta(999 as TaskPriority);
    expect(result).toEqual({ label: 'High', className: 'high' });
  });
});

describe('getPriorityOptions', () => {
  it('should return all three priority options', () => {
    const options = getPriorityOptions();
    expect(options).toHaveLength(3);
  });

  it('should return options in correct order (low, medium, high)', () => {
    const options = getPriorityOptions();
    expect(options[0]).toEqual({ value: TaskPriority.low, label: 'Low' });
    expect(options[1]).toEqual({ value: TaskPriority.medium, label: 'Medium' });
    expect(options[2]).toEqual({ value: TaskPriority.high, label: 'High' });
  });

  it('should have correct value types', () => {
    const options = getPriorityOptions();
    options.forEach(option => {
      expect(typeof option.value).toBe('number');
      expect(typeof option.label).toBe('string');
    });
  });
});
