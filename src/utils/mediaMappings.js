import { faLink, faCode, faFileAlt, faDownload, faPhotoVideo, faQuoteRight } from '@fortawesome/free-solid-svg-icons'

export const mediaMappings = {
  url: {
    label: 'Link',
    icon: faLink,
  },
  code: {
    label: 'Code',
    icon: faCode,
  },
  doc: {
    label: 'Document',
    icon: faFileAlt,
  },
  dl: {
    label: 'Download',
    icon: faDownload,
  },
  video: {
    label: 'Media',
    icon: faPhotoVideo,
  },
  default: {
    label: 'Misc.',
    icon: faQuoteRight,
  },
}
