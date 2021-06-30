const calculateRiasec = (weights) => {
  console.log('weights: ')
  console.log(weights)
  var code
  if (weights[0] == 'p') {
    if (weights[1] == 'i') {
      if (weights[2] == 'ns' || weights[2] == 's') {
        if (weights[3] == 'nc') {
          code = 'a'
        } else if (weights[3] == 'c') {
          code = 's'
        }
      }
    } else if (weights[1] == 'd') {
      if (weights[2] == 'ns' || weights[2] == 's') {
        if (weights[3] == 'nc') {
          code = 's'
        } else if (weights[3] == 'c') {
          code = 'e'
        }
      }
    }
  } else if (weights[0] == 't') {
    if (weights[1] == 'i') {
      if (weights[2] == 'ns') {
        if (weights[3] == 'nc') {
          code = 'i'
        } else if (weights[3] == 'nc') {
          code = 'r'
        }
      } else if (weights[2] == 's') {
        if (weights[3] == 'nc') {
          code = 'a'
        } else if (weights[3] == 'c') {
          code = 'r'
        }
      }
    } else if (weights[1] == 'd') {
      if (weights[2] == 'ns') {
        if (weights[3] == 'nc') {
          code = 'r'
        } else if (weights[3] == 'c') {
          code = 'e'
        }
      } else if (weights[2] == 's') {
        if (weights[3] == 'nc') {
          code = 'e'
        } else if (weights[3] == 'c') {
          code = 'e'
        }
      }
    }
  }

  return { code }
}

export default calculateRiasec
