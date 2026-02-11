import shared from '@todo/shared-config/eslint'

export default [...shared, { ignores: ['dist', 'node_modules', '**/*.config.*'] }]
