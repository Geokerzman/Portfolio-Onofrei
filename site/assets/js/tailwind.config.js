/* Tailwind theme — source for assets/css/tailwind.css. Recompile after adding utility classes (see README). */
tailwind.config = {
    theme: {
      extend: {
        colors: {
          paper:    '#F5F4F1',
          surface:  '#FFFFFF',
          ink:      '#0B0C0E',
          onink:    '#F7F6F3',
          graphite: '#5A6068',
          mist:     '#DCD9D2',
          accent:   '#0085F2',
          signal:   '#F3C77A',
          /* on-dark tints of --graphite, lightened for contrast on --ink */
          ondim:    'var(--ondim)',
          onquiet:  'var(--onquiet)',
          onmute:   'var(--onmute)'
        },
        fontFamily: {
          display: ['Satoshi', 'system-ui', 'sans-serif'],
          body:    ['Satoshi', 'system-ui', 'sans-serif']
        },
        fontSize: {
          's13':  ['13px', '1.6'],
          's15':  ['15px', '1.6'],
          's17':  ['17px', '1.6'],
          's20':  ['clamp(17px, 1.1vw + 14px, 20px)', '1.6'],
          's26':  ['clamp(22px, 1.4vw + 17px, 26px)', '1.2'],
          's28':  ['clamp(23px, 1.6vw + 17px, 28px)', '1.14'],
          's34':  ['clamp(26px, 2.2vw + 18px, 34px)', '1.08'],
          's48':  ['clamp(32px, 3.6vw + 20px, 48px)', '1.06'],
          's72':  ['clamp(38px, 6.2vw + 16px, 72px)', '1.02']
        },
        letterSpacing: {
          display: '-0.03em',
          label:   '0.14em'
        },
        spacing: {
          'gut':     '24px',   /* container padding, mobile */
          'gut-lg':  '48px',   /* container padding, desktop */
          'rhythm':  '112px',  /* section rhythm, mobile */
          'rhythm-lg': '168px' /* section rhythm, desktop */
        },
        maxWidth: {
          container: '1348px',
          measure:   '68ch'
        },
        borderRadius: {
          card: '16px',
          tag:  '999px'
        },
        transitionTimingFunction: {
          out: 'var(--ease)'
        },
        boxShadow: {
          card: 'var(--shadow-card)'
        }
      }
    }
  };
