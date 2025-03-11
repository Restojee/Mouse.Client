import fs from 'fs';
import path from 'path';
import { Compiler, Compilation, sources, WebpackError } from 'webpack';
import { RawSource } from 'webpack-sources';

type PluginOptions = {
  input: string;
  output?: string;
};

class StyleVariablesPlugin {
  private options: PluginOptions;

  constructor(options: PluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap('StyleVariablesPlugin', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'StyleVariablesPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets, callback) => {
          const { input, output } = this.options;

          if (!input) {
            compilation.errors.push(new WebpackError('StyleVariablesPlugin: input file is required.'));
            return callback();
          }

          fs.readFile(input, 'utf8', (err, data) => {
            if (err) {
              compilation.errors.push(new WebpackError(`StyleVariablesPlugin: Failed to read ${input}`));
              return callback();
            }

            let json;
            try {
              json = JSON.parse(data);
            } catch {
              compilation.errors.push(new WebpackError(`StyleVariablesPlugin: Invalid JSON in ${input}`));
              return callback();
            }

            // Функция для замены ссылок на значения переменных
            const resolveVariables = (obj: any, root: any): any => {
              if (typeof obj === 'string') {
                return obj.replace(/{(.*?)}/g, (_, path) => {
                  const keys = path.split('.');
                  let value = root;
                  for (const key of keys) {
                    if (value && typeof value === 'object' && key in value) {
                      value = value[key];
                    } else {
                      return `{${path}}`; // Оставляем как есть, если не нашли
                    }
                  }
                  return value;
                });
              } else if (typeof obj === 'object' && obj !== null) {
                for (const key in obj) {
                  obj[key] = resolveVariables(obj[key], root);
                }
              }
              return obj;
            };

            // Обрабатываем JSON, заменяя ссылки на значения
            json = resolveVariables(json, json);

            const flattenObject = (obj: Record<string, any>, prefix = ''): string => {
              return Object.entries(obj).reduce((acc, [key, value]) => {
                const newKey = prefix + key.charAt(0).toUpperCase() + key.slice(1);
                return acc + (typeof value === 'object' ? flattenObject(value, newKey) : `  --${newKey}: ${value};\n`);
              }, '');
            };

            const cssContent = `:root {\n${flattenObject(json)}}\n`;

            // Сохранение в файловую систему
            const outputPath = path.resolve(process.cwd(),
              path.resolve(__dirname, 'src/resources/variables.scss'));
            fs.mkdirSync(path.dirname(output), { recursive: true }); // Создание директорий, если их нет
            fs.writeFileSync(output, cssContent, 'utf8');
            console.log(`StyleVariablesPlugin: CSS файл сохранен в ${outputPath}`);

            callback();
          });
        }
      );
    });
  }
}

export default StyleVariablesPlugin;
