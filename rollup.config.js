import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import tslint from "rollup-plugin-tslint";
import less from 'rollup-plugin-less';
import postcss from 'rollup-plugin-postcss'

export default {
    input: './src/components/**/*.tsx',

    plugins: [
        typescript(),  // 会自动读取 文件tsconfig.json配置
        babel(),
        tslint({
            throwOnError: true,
            throwOnWarning: true,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: ['node_modules/**', '*.js', '*.scss', '*.css'],
        }),
        // less(),
        postcss({
            // Extract CSS to the same location where JS file is generated but with .css extension.
            extract: true,
            // Use named exports alongside default export.
            // namedExports: true,
            // Minimize CSS, boolean or options for cssnano.
            minimize: true,
            // Enable sourceMap.
            sourceMap: true,
            // This plugin will process files ending with these extensions and the extensions supported by custom loaders.
            extensions: [".less", ".css"],
        }),
    ],
    external: ['react', 'react-dom'],
    output: {
        file: "lib/index.js",
        format: "esm",
        sourcemap: true,
    }
}
