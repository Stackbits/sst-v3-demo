import { DurationMinutes } from '../../../.sst/platform/src/components/duration';
import { Input } from '../../../.sst/platform/src/components/input';
import { Size } from '../../../.sst/platform/src/components/size';

export const DEFAULT_FUNCTION_CONFIG: {
    memory: Input<Size>;
    runtime: Input<
        'nodejs20.x' | 'nodejs18.x' | 'provided.al2023' | 'python3.9' | 'python3.10' | 'python3.11' | 'python3.12'
    >;
    timeout: Input<DurationMinutes>;
} = {
    memory: '128 MB',
    runtime: 'nodejs20.x',
    timeout: '30 seconds',
};
