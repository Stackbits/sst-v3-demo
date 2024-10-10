import { BuildOptions, Loader } from 'esbuild';
import { DurationMinutes } from '../../../.sst/platform/src/components/duration';
import { Input } from '../../../.sst/platform/src/components/input';
import { Size } from '../../../.sst/platform/src/components/size';

export const DEFAULT_FUNCTION_CONFIG: {
    memory: Input<Size>;
    runtime: Input<
        'nodejs20.x' | 'nodejs18.x' | 'provided.al2023' | 'python3.9' | 'python3.10' | 'python3.11' | 'python3.12'
    >;
    timeout: Input<DurationMinutes>;
    nodejs?: Input<{
        loader?: Input<Record<string, Loader>>;
        install?: Input<string[]>;
        banner?: Input<string>;
        esbuild?: Input<BuildOptions>;
        minify?: Input<boolean>;
        format?: Input<'cjs' | 'esm'>;
        sourcemap?: Input<boolean>;
        splitting?: Input<boolean>;
    }>;
} = {
    memory: '128 MB',
    runtime: 'nodejs20.x',
    timeout: '30 seconds',
    nodejs: {
        splitting: true,
        format: 'esm',
        esbuild: {
            treeShaking: true,
            external: ['esbuild', '@pulumi/aws', 'typescript', '@types/aws-lambda', '@tsconfig/node20'],
        },
    },
};
