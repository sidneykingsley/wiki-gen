const calculateRiasec = (weights) => {
  console.log(weights)
  var code
  if (weights.pt == 'p') {
    if (weights.id == 'i') {
      if (weights.s == 'ns' || weights.s == 's') {
        if (weights.c == 'nc') {
          code = 'a'
        } else if (weights.c == 'c') {
          code = 's'
        }
      }
    } else if (weights.id == 'd') {
      if (weights.s == 'ns' || weights.s == 's') {
        if (weights.c == 'nc') {
          code = 's'
        } else if (weights.c == 'c') {
          code = 'e'
        }
      }
    }
  } else if (weights.pt == 't') {
    if (weights.id == 'i') {
      if (weights.s == 'ns') {
        if (weights.c == 'nc') {
          code = 'i'
        } else if (weights.c == 'nc') {
          code = 'r'
        }
      } else if (weights.s == 's') {
        if (weights.c == 'nc') {
          code = 'a'
        } else if (weights.c == 'c') {
          code = 'r'
        }
      }
    } else if (weights.id == 'd') {
      if (weights.s == 'ns') {
        if (weights.c == 'nc') {
          code = 'r'
        } else if (weights.c == 'c') {
          code = 'e'
        }
      } else if (weights.s == 's') {
        if (weights.c == 'nc') {
          code = 'e'
        } else if (weights.c == 'c') {
          code = 'e'
        }
      }
    }
  }

  return { code }
}

export default calculateRiasec
