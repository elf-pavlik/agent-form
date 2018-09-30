const labels = {
  'en': {
    'name': 'name'
  },
  'es': {
    'name': 'nombre'
  }
}

export default function Localize (language) {
  return function localize (label) {
    if (!labels[language]) return `I18N LANGUAGE MISSING`
    return labels[language][label] || 'I18N LABEL MISSING'
  }
}
