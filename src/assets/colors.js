export default {
  acorn: {
    green: {
      L1: { hex: 'c3dca5', rgb: '195,220,165' },
      L2: { hex: 'b4cb7d', rgb: '180,203,125' },
      M1: { hex: '8eaf68', rgb: '142,175,104' },
      M2: { hex: '80a862', rgb: '128,168,98' },
      D1: { hex: '47722b', rgb: '71,114,43' },
      D2: { hex: '3d642d', rgb: '61,100,45' }
    },
    brown: {
      L1: { hex: 'ecd5c7', rgb: '236,213,199' },
      L2: { hex: 'e5cbb2', rgb: '229,203,178' },
      M1: { hex: 'f0ada5', rgb: '240,173,165' },
      M2: { hex: 'b99573', rgb: '185,149,115' },
      D1: { hex: 'ae6449', rgb: '174,100,73' },
      D2: { hex: '713626', rgb: '113,54,38' }
    },
    gray: {
      L1: { hex: 'cfd4da', rgb: '207,212,218' },
      L2: { hex: '9ea8b1', rgb: '158,168,177' },
      M1: { hex: '7a7687', rgb: '122,118,135' },
      M2: { hex: '555259', rgb: '85,82,89' },
      D1: { hex: '333136', rgb: '51,49,54' },
      D2: { hex: '1c1d1f', rgb: '28,29,31' }
    }
  },
  oakleaf: {
    green: {
      L1: { hex: '7ac119', rgb: '122,193,25' },
      M1: { hex: '579b44', rgb: '87,155,68' },
      D1: { hex: '366c20', rgb: '54,108,32' }
    }
  },
  pine: {
    green: {
      L1: { hex: 'bfccae', rgb: '191,204,174' },
      L2: { hex: 'b2b5a4', rgb: '178,181,164' },
      M1: { hex: '7f8a62', rgb: '127,138,98' },
      M2: { hex: '62703b', rgb: '98,112,59' },
      D1: { hex: '3a4024', rgb: '58,64,36' },
      D2: { hex: '2e321b', rgb: '46,50,27' }
    },
    brown: {
      L1: { hex: 'ffcf99', rgb: '255,207,153' },
      L2: { hex: 'eaaf83', rgb: '234,175,131' },
      M1a: { hex: 'd08c43', rgb: '208,140,67' },
      M2a: { hex: 'a46137', rgb: '164,97,55' },
      M1b: { hex: '5f3930', rgb: '95,57,48' },
      M2b: { hex: '4f2c2b', rgb: '79,44,38' },
      D1: { hex: '7a3d2a', rgb: '122,61,42' },
      D2: { hex: '561d0a', rgb: '86,29,10' }
    }
  },
  rgb: function (rgb) {
    return 'rgb(' + rgb + ')'
  },
  rgba: function (rgb, alpha) {
    return 'rgba(' + rgb + ',' + alpha + ')'
  }
}
