import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: 'http://tfm-maps.ru:8000/api/v3/api-docs',
    apiFile: './src/api/coreMapsApi.ts',
    // outputFiles: {
    //     './src/store/devices/deviceQueries.ts': {
    //         filterEndpoints: [/Devices/i],
    //     },
    //   }
    // },
    outputFile: "./src/api/codegen/genMouseMapsApi.ts",
    exportName: "mouseMapsApi",
    apiImport: "coreMapsApi",
    hooks: false,
}

export default config
