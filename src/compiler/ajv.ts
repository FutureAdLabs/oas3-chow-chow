import * as Ajv from 'ajv';

const options: Ajv.Options = {
  /**
   * Ignore following formats for now because they are not supported by AJV by default.
   * TODO: Add custom format supports for following formats.
   */
  unknownFormats: [ 'int32', 'int64', 'float', 'double', 'byte', 'binary', 'password' ],
  jsonPointers: true
}

export default function ajv(opts: Ajv.Options = {}) {
  const ajv = new Ajv({
    ...options,
    ...opts
  })

  const nullableKeywordDefinition: Ajv.KeywordDefinition = {
    inline: require("../../lib/dotjs/nullable"),
    errors: true,
    // statements: true,
    metaSchema: { type: 'boolean' }
  }

  ajv.addKeyword('nullable', nullableKeywordDefinition);
  ajv.addKeyword('x-nullable', nullableKeywordDefinition);

  return ajv
}
