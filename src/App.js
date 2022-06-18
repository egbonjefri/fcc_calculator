import { buttons } from './Button'
import { useState } from 'react'
import './index.css'
let array1 = [];

function App() {
  const [sym, setSym] = useState([]);
  const [num, setNum] = useState([]);
  const [calc, setCalc] = useState([]);
  const [operand, setOperand] = useState([]);
  const [truthy, setTruthy] = useState(false);
  const [equals, setEquals] = useState([]);
  const [bracket, setbracket] = useState([]);

  const buttonMap = buttons.map((button) => {
    return (
      <div onClick={()=>{
        const back = document.getElementsByClassName('calc-buttons')[button.key];
        back.classList.add('active');
        setTimeout(() => {
          back.classList.remove('active')
        }, 250);
        switch(button.name) {
          case 'C': 
          setNum([]);
          setCalc([]);
          setOperand([]);
          setSym([]);
          setTruthy(false);
          setEquals([]);
          array1 = [];
          break
          case '( )':
            if (bracket === 1) {
              setNum(num+')')
              setbracket([]);
            }
            else {
              setNum('('+num);
              setbracket(1)
            }
            break
          case '+/-':
            if (operand !== '') {
            if (truthy) {
              setNum('(+'+num);
              setbracket(1)
              setTruthy(false)
            }
            else {
              setNum('(-'+num);
              setOperand('-')
              setbracket(1)
              setTruthy(true)
            }
            }
            else {
              if(typeof equals !== 'object' && array1[0] > 0) {
                let a = array1[0] * -1;
                array1 = [];
                array1.push(a);
                setNum(array1[0])
              }
              else {
                if (array1[0] < 0) {
                  let a = array1[0] * -1;
                  array1 = [];
                  array1.push(a);
                  setNum(array1[0])
                }
                else {
                setOperand('-');
                setNum(array1[0]+sym+'(-');
                setbracket(1)
              }
            }
            }
          
            break
          case '.':
           
            if (Math.round(operand) === 0) {
             
              if (operand === '' || typeof operand === 'object') {
                if (operand%Math.round(operand) !== 0) {
                  if (array1[0]%Math.round(array1[0]) !== 0 && array1[0] !== undefined) {
                   return false
                  }
                  else {
                setNum(num+'0'+button.name);
                setOperand('0.'+operand);
                }
                }
                else {
                  return false
                }
              }
            }
            else {
             
              if (!truthy) {
              setNum(num+button.name);
              setOperand(operand+button.name); 
              setTruthy(true)
            }
          }
        
            break
          case '%':
        
            if (array1.length > 0) {
              
              if (typeof operand === 'number') {
                let a = Number(operand)/100;
                array1 = [];
                array1.push(a);
                setSym('\xD7');
                setTruthy(false);
                setNum(`${array1[0]}\xD7`);
                setOperand('')
              }
              else {
               
              let a = array1[0]/100;
              array1 = [];
              array1.push(a);
              setSym('\xD7');
              setOperand('')
              setTruthy(false);
              setNum(`${array1[0]}\xD7`);
            }
          }
            else {
             
              if(operand !== '') {
                if (typeof operand === 'object') {
                  return false
                }
                else
                setOperand(Number(operand)/100);
                setNum(`${operand}%\xD7`);
                setSym('\xD7');
                setTruthy(false)
                array1 = [];
                array1.push(operand/100);
                setOperand('')
              }
            }
            
          break

            case '+':
             
            
              if (sym !== '+') {
                
                if (typeof calc === 'number') {
                  array1 = [];
                  array1.push(calc)
                }
                else {
                 
                  if (typeof operand === 'number') {
                    
                    if (operand%Math.round(operand) !== 0) {
                      array1.push(parseFloat(operand));
                    }
                    else {
                    array1.push(parseInt(operand));
                    }
                   
                  }
                  if (typeof operand === 'string') {
                    if (operand%Math.round(operand) !== 0) {
                      if (Math.ceil(operand) === 1) {
                        array1.push(parseFloat(operand));
                      }
                      else {
                        if (isNaN(operand%Math.round(operand))) {
                          setSym('+');
                          setTruthy(false)
                        }
                        else {
                        array1.push(parseFloat(operand));
                        }
                      }
                     
                    }
                    else {
                    array1.push(parseInt(operand));
                    
                    }
                  }
                
                      }
                     
                   
                setOperand('');
                if (array1.length === 1) {
                  
                    setNum(array1[0]+button.name)
                    setSym('+');
                    setTruthy(false)
                         }
      
                    else {
                    if (typeof calc === 'number') {
                      setNum(calc+button.name);
                      setSym('+');
                      setTruthy(false)
                    }
                    else {
                      return false
                    }

                     }
            switch (sym) {
              case '\u2013': 
             
              const diff = array1.reduce(
                (previousValue, currentValue) => {
                  if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                    array1.pop(currentValue)
                    setOperand('');
                      setSym('+');
                      setTruthy(false)
                      setNum(array1[0]+button.name)
                    return false
                  }
                  else {
                    return previousValue - currentValue
                  }
                  });

              if (typeof diff === 'number') {
                
                setCalc(diff);
                setOperand('');
                setSym('+');
                setTruthy(false)
                setNum(diff+button.name)
               
              }
              else {
                return false
              }
              break

                case '\xF7':
                  const divide = array1.reduce(
                    (previousValue, currentValue) => {
                      if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                        array1.pop(currentValue);
                        setOperand('');
                      setSym('+');
                      setTruthy(false)
                      setNum(array1[0]+button.name)
                        return 'I will not divide by Zero :p'
                      }
                     return previousValue / currentValue});
                  if (typeof divide === 'number') {
                    setCalc(divide);
                    setOperand('');
                    setSym('+');
                    setTruthy(false)
                    setNum(divide+button.name)
                   
                  }
                  else {
                    setCalc(divide);
                    setNum('')
                  }
                  
                  break
                  case '\xD7': 
                
                  const multiply = array1.reduce(
                    (previousValue, currentValue) => {
                      if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                        array1.pop(currentValue);
                        setOperand('');
                       
                      setSym('+');
                      setTruthy(false)
                      setNum(array1[0]+button.name)
                        return false
                      }
                      else {
                     return previousValue * currentValue}});
                    if (typeof multiply === 'number') {
                      setCalc(multiply);
                      setOperand('');
                      setSym('+');
                      setTruthy(false)
                      setNum(multiply+button.name)
                    }
                    else {
                      return false
                    }
                  
                  break
                  default:
                    return false
          }
               
              }
             if (sym === '+') {
              
               if (typeof calc !== 'number') {
                
                if (operand%Math.round(operand) !== 0) {
                  
                  if (Math.ceil(operand) === 1) {
                    array1.push(parseFloat(operand));
                  }
                  else {
                    if (isNaN(operand%Math.round(operand))) {
                      setSym('+');
                      setTruthy(false)
                    }
                    else {
                    array1.push(parseFloat(operand));
                    }
                  }

                }
                else {
                array1.push(parseInt(operand));
               
                }
                    
                setOperand('');
                      
                const sum = array1.reduce(
                  (previousValue, currentValue) => {
                    if (typeof currentValue !== 'number') {
                      array1.splice(array1.indexOf(currentValue), 1);
                     
                      return false
                    }
                    else {
                     
                      return previousValue + currentValue
                    }
                    });
                    
                if (typeof sum === 'number') {
                 
                  setCalc(sum);
                  setOperand('');
                  setSym('+');
                  setTruthy(false)
                  setNum(sum+button.name)
                  array1 = [];
                  array1.push(sum)
                  
                }
                else {
                  if (typeof array1[0] === 'number') {
                  setNum(array1[0]+button.name)
                  }
                  else {
                    return false
                  }
                }
                 
               }
               else {
               
                
                if (operand%Math.round(operand) !== 0) {
                  if (Math.ceil(operand) === 1) {
                    array1.push(parseFloat(operand));
                  }
                  else {
                    if (isNaN(operand%Math.round(operand))) {
                      return false
                    }
                    else {
                    array1.push(parseFloat(operand));
                    }
                  }

                }
                else {
                array1.push(parseInt(operand));
                
                }
                    
                setOperand('');
  
                const sum = array1.reduce(
                  (previousValue, currentValue) => {
                    if (typeof currentValue !== 'number') {
                      array1.splice(array1.indexOf(currentValue), 1);
                      return false
                    }
                    else {
                      return previousValue + currentValue
                    }
                    });

                if (typeof sum === 'number') {
                  

                  if (array1.length === 1) {
                    let a = calc + array1[0]
                    setCalc(a);
                    setOperand('');
                    setSym('+');
                    setTruthy(false)
                    setNum(a+button.name)
                    array1.push(calc)
                    
                  }  
                  else {
                  setCalc(sum);
                  setOperand('');
                  setSym('+');
                  setTruthy(false)
                  setNum(sum+button.name);
                  array1 = [];
                  array1.push(sum)
                }
              }
                else {
                  return false
                }
               }
             
              
             
             
             } 
              break

            
              case '\xF7':
             
            
                if (sym !== '\xF7') {
                  if (typeof calc === 'number') {
                    array1 = [];
                    array1.push(calc);
                   
                  }
                    if (typeof operand === 'number') {
                      
                      if (operand%Math.round(operand) !== 0) {
                        array1.push(parseFloat(operand));
                      }
                      else {
                      array1.push(parseInt(operand));
                      
                      }
                     
                    }
                    if (typeof operand === 'string') {
                      
                      if (operand%Math.round(operand) !== 0) {
                        if (Math.ceil(operand) === 1) {
                          array1.push(parseFloat(operand));
                        }
                        else {
                          if (isNaN(operand%Math.round(operand))) {
                            setSym('\xF7');
                            setTruthy(false)
                          }
                          else {
                          array1.push(parseFloat(operand));
                          }
                        }
 
                      }
                      else {
                      array1.push(parseInt(operand));
                      
                      }
                    }
                 
                     
                       
                     
                  setOperand('');
                  if (array1.length === 1) {
                    
                      setNum(array1[0]+button.name)
                      setSym('\xF7');
                      setTruthy(false)
                           }
        
                      else {
                       if (typeof calc === 'number') {
                     setNum(calc+button.name);
                       setSym('\xF7');
                       setTruthy(false);
                       }
                       else {
                         return false
                       }
                       }
              switch (sym) {
                case '+': 
               
                const sum = array1.reduce(
                  (previousValue, currentValue) => {
                    if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                      array1.pop(currentValue);
                      setOperand('');
                      setSym('\xF7');
                      setTruthy(false)
                      setNum(array1[0]+button.name)
                      return false
                    }
                    else {
                      return previousValue + currentValue
                    }
                    });
  
                if (typeof sum === 'number') {
                  
                  setCalc(sum);
                  setOperand('');
                  setSym('\xF7');
                  setTruthy(false)
                  setNum(sum+button.name)
                  
                }
                else {
                  return false
                }
                break
  
                  case '\u2013':
                    const diff = array1.reduce(
                      (previousValue, currentValue) => {
                        if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                          array1.pop(currentValue);
                          setOperand('');
                          setSym('\xF7');
                          setTruthy(false)
                          setNum(array1[0]+button.name)
                          return false
                        }
                       return previousValue - currentValue});
                    if (typeof diff === 'number') {
                      setCalc(diff);
                      setOperand('');
                      setSym('\xF7');
                      setTruthy(false)
                      setNum(diff+button.name)
                     
                    }
                    else {
                      return false
                    }
                    
                    break
                    case '\xD7': 
                    const multiply = array1.reduce(
                      (previousValue, currentValue) => {
                        if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                          array1.pop(currentValue);
                          setOperand('');
                          setSym('\xF7');
                          setTruthy(false)
                          setNum(array1[0]+button.name)
                          return false
                        }
                        else {
                       return previousValue * currentValue}});
                      if (typeof multiply === 'number') {
                       
                        setCalc(multiply);
                        setOperand('');
                        setSym('\xF7');
                        setTruthy(false)
                        setNum(multiply+button.name)
                       
                        
                       
                      }
                      else {
                        return false
                      }
                    
                    break
                    default:
                      return false
            }
                 
                }
               if (sym === '\xF7') {
               
                 if (typeof calc !== 'number') {
                  if (operand%Math.round(operand) !== 0) {
                    if (Math.ceil(operand) === 1) {
                      array1.push(parseFloat(operand));
                    }
                    else {
                      if (isNaN(operand%Math.round(operand))) {
                        setSym('\xF7')
                       }
                       else {
                      array1.push(parseFloat(operand));
                      }
                    }

                  }
                  else {
                  array1.push(parseInt(operand));
                  
                  }
                      
                  setOperand('');
    
                  const divide = array1.reduce(
                    (previousValue, currentValue) => {
                      if (currentValue === 0 || typeof currentValue !== 'number') {
                        array1.splice(array1.indexOf(currentValue), 1);
                        
                        return 'Can\'t Divide by Zero'
                      }
                      else {
                       
                        return previousValue / currentValue
                      }
                      });
                      
                  if (typeof divide === 'number') {
                   
                    setCalc(divide);
                    setOperand('');
                    setSym('\xF7');
                    setTruthy(false)
                    setNum(divide+button.name)
                    array1 = [];
                    array1.push(divide)
                    
                  }
                  else {
                    setNum(divide)
                    
                  }
                   
                 }
                 else {
                  
                  
                  if (operand%Math.round(operand) !== 0) {
                    if (Math.ceil(operand) === 1) {
                      array1.push(parseFloat(operand));
                    }
                    else {
                      if (isNaN(operand%Math.round(operand))) {
                        return false
                      }
                      else {
                      array1.push(parseFloat(operand));
                      }
                    }

                  }
                  else {
                  array1.push(parseInt(operand));
                  
                  }
                  setOperand('');
    
                  const divide = array1.reduce(
                    (previousValue, currentValue) => {
                      if (currentValue === 0 || typeof currentValue !== 'number') {
                        array1.splice(array1.indexOf(currentValue), 1);
                        return 'Can\'t Divide by Zero'
                      }
                      else {
                        return previousValue / currentValue
                      }
                      });
  
                  if (typeof divide === 'number') {
                    
  
                    if (array1.length === 1) {
                      let a = calc / array1[0]
                      setCalc(a);
                      setOperand('');
                      setSym('\xF7');
                      setTruthy(false)
                      setNum(a+button.name)
                      array1.push(calc)
                    }  
                    else {
                    setCalc(divide);
                    setOperand('');
                    setSym('\xF7');
                    setTruthy(false)
                    setNum(divide+button.name)
                    array1 = [];
                    array1.push(divide)
                  }
                }
                  else {
                    setNum('')
                    setCalc(divide)
                  }
                 }
               } 
                break
  


                case '\u2013':
               
            
                if (sym !== '\u2013') {
                  if (typeof calc === 'number') {
                    array1 = [];
                    array1.push(calc);
                    
                  }
                    if (typeof operand === 'number') {
                      
                      if (operand%Math.round(operand) !== 0) {
                        array1.push(parseFloat(operand));
                      }
                      else {
                      array1.push(parseInt(operand));
                      
                      }
                     
                    }
                    if (typeof operand === 'string') {
                      
                      if (operand%Math.round(operand) !== 0) {
                        if (Math.ceil(operand) === 1) {
                          array1.push(parseFloat(operand));
                        }
                        else {
                          if (isNaN(operand%Math.round(operand))) {
                            setSym('\u2013');
                            setTruthy(false)
                          }
                          else {
                          array1.push(parseFloat(operand));
                          }
                        }
 
                      }
                      else {
                      array1.push(parseInt(operand));
                      
                      }
                    }
                 
                     
                       
                     
                  setOperand('');
                  if (array1.length === 1) {
                    
                      setNum(array1[0]+button.name)
                      setSym('\u2013');
                      setTruthy(false)
                           }
        
                      else {
                       if (typeof calc === 'number') {
                     setNum(calc+button.name);
                       setSym('\u2013');
                       setTruthy(false)
                       }
                       else {
                         return false
                       }
                      }
              switch (sym) {
                case '+': 
               
                const sum = array1.reduce(
                  (previousValue, currentValue) => {
                    if (typeof currentValue !== 'number'|| isNaN(currentValue) ) {
                      array1.pop(currentValue);
                      setOperand('');
                        setSym('\u2013');
                        setTruthy(false)
                        setNum(array1[0]+button.name)
                      return false
                    }
                    else {
                      return previousValue + currentValue
                    }
                    });
  
                if (typeof sum === 'number') {
                  
                  setCalc(sum);
                  setOperand('');
                  setSym('\u2013');
                  setTruthy(false)
                  setNum(sum+button.name)
                  
                }
                else {
                  return false
                }
                break
  
                  case '\xF7':
                    const divide = array1.reduce(
                      (previousValue, currentValue) => {
                        if (currentValue === 0 || typeof currentValue !== 'number' || isNaN(currentValue)) {
                          array1.pop(currentValue)
                          return 'I will not divide by Zero :p'
                        }
                       return previousValue / currentValue});
                    if (typeof divide === 'number') {
                      setCalc(divide);
                      setOperand('');
                      setSym('\u2013');
                      setTruthy(false)
                      setNum(divide+button.name)
                      
                    }
                    else {
                      setCalc(divide);
                      setNum('')
                    }
                    
                    break
                    case '\xD7': 
                    const multiply = array1.reduce(
                      (previousValue, currentValue) => {
                        if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                          array1.pop(currentValue);
                          setOperand('');
                        setSym('\u2013');
                        setTruthy(false)
                        setNum(previousValue+button.name)
                          return false
                        }
                        else {
                       return previousValue * currentValue}});
                      if (typeof multiply === 'number') {
                       
                        setCalc(multiply);
                        setOperand('');
                        setSym('\u2013');
                        setTruthy(false)
                        setNum(multiply+button.name)
     
                      }
                      else {
                        return false
                      }
                    
                    break
                    default:
                      return false
            }
                 
                }
               if (sym === '\u2013') {
                
                 if (typeof calc !== 'number') {
                  if (operand%Math.round(operand) !== 0) {
                    if (Math.ceil(operand) === 1) {
                      array1.push(parseFloat(operand));
                    }
                    else {
                      if (isNaN(operand%Math.round(operand))) {
                        setSym('\u2013');
                        return false
                      }
                      else {
                      array1.push(parseFloat(operand));
                      }
                    }

                  }
                  else {
                  array1.push(parseInt(operand));
                  
                  }
                      
                  setOperand('');
    
                  const diff = array1.reduce(
                    (previousValue, currentValue) => {
                      if (typeof currentValue !== 'number') {
                        array1.splice(array1.indexOf(currentValue), 1);
                        
                        return false
                      }
                      else {
                       
                        return previousValue - currentValue
                      }
                      });
                      
                  if (typeof diff === 'number') {
                   
                    setCalc(diff);
                    setOperand('');
                    setSym('\u2013');
                    setTruthy(false)
                    setNum(diff+button.name)
                    array1 = [];
                    array1.push(diff)
                    
                  }
                  else {
                    if (typeof calc === 'number') {
                      setNum(calc+button.name)
                    }
                   else {
                     return false
                   }
                    
                  }
                   
                 }
                 else {
                  
                  
                  if (operand%Math.round(operand) !== 0) {
                    array1.push(parseFloat(operand));
                      }
                   else {
                    array1.push(parseInt(operand));
                        }
                      
                  setOperand('');
    
                  const diff = array1.reduce(
                    (previousValue, currentValue) => {
                      if (typeof currentValue !== 'number') {
                        array1.splice(array1.indexOf(currentValue), 1);
                        return false
                      }
                      else {
                        return previousValue - currentValue
                      }
                      });
  
                  if (typeof diff === 'number') {
                    
  
                    if (array1.length === 1) {
                      let a = calc - array1[0]
                      setCalc(a);
                      setOperand('');
                      setSym('\u2013');
                      setTruthy(false)
                      setNum(a+button.name)
                      
                      array1.push(calc)
                      
                    }  
                    else {
                    setCalc(diff);
                    setOperand('');
                    setSym('\u2013');
                    setTruthy(false)
                    setNum(diff+button.name)
                    array1 = [];
                    array1.push(diff)
                  }
                }
                  else {
                    return false
                  }
                 }
               } 
                break






                case '\xD7':
             
            
              if (sym !== '\xD7') {
                
                if (typeof calc === 'number') {
                  array1 = [];
                  array1.push(calc)
                }
                else {
                 
                  if (typeof operand === 'number') {
                    
                    if (operand%Math.round(operand) !== 0) {
                      array1.push(parseFloat(operand));
                    }
                    else {
                    array1.push(parseInt(operand));
                    }
                   
                  }
                  if (typeof operand === 'string') {
                    if (operand%Math.round(operand) !== 0) {
                      if (Math.ceil(operand) === 1) {
                        array1.push(parseFloat(operand));
                      }
                      else {
                        if (isNaN(operand%Math.round(operand))) {
                          setSym('\xD7');
                          setTruthy(false)
                        }
                        else {
                        array1.push(parseFloat(operand));
                        }
                      }
                     
                    }
                    else {
                    array1.push(parseInt(operand));
                    
                    }
                  }
                
                      }
                     
                   
                setOperand('');
                if (array1.length === 1) {
                  
                    setNum(array1[0]+button.name)
                    setSym('\xD7');
                    setTruthy(false)
                         }
      
                    else {
                    if (typeof calc === 'number') {
                      setNum(calc+button.name);
                      setSym('\xD7');
                      setTruthy(false)
                    }
                    else {
                      return false
                    }

                     }
            switch (sym) {
              case '\u2013': 
             
              const diff = array1.reduce(
                (previousValue, currentValue) => {
                  if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                    array1.pop(currentValue)
                    setOperand('');
                      setSym('\xD7');
                      setTruthy(false)
                      setNum(array1[0]+button.name)
                    return false
                  }
                  else {
                    return previousValue - currentValue
                  }
                  });

              if (typeof diff === 'number') {
                
                setCalc(diff);
                setOperand('');
                setSym('\xD7');
                setTruthy(false)
                setNum(diff+button.name)
               
              }
              else {
                return false
              }
              break

                case '\xF7':
                  const divide = array1.reduce(
                    (previousValue, currentValue) => {
                      if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                        array1.pop(currentValue);
                        setOperand('');
                      setSym('\xD7');
                      setTruthy(false)
                      setNum(array1[0]+button.name)
                        return 'I will not divide by Zero :p'
                      }
                     return previousValue / currentValue});
                  if (typeof divide === 'number') {
                    setCalc(divide);
                    setOperand('');
                    setSym('\xD7');
                    setTruthy(false)
                    setNum(divide+button.name)
                   
                  }
                  else {
                    setCalc(divide);
                    setNum('')
                  }
                  
                  break
                  case '+': 
                 
                  const sum = array1.reduce(
                    (previousValue, currentValue) => {
                      if (typeof currentValue !== 'number' || isNaN(currentValue)) {
                        array1.pop(currentValue);
                        setOperand('');
                      setSym('\xD7');
                      setTruthy(false)
                      setNum(array1[0]+button.name)
                        return false
                      }
                      else {
                     return previousValue + currentValue}});
                    if (typeof sum === 'number') {
                      setCalc(sum);
                      setOperand('');
                      setSym('\xD7');
                      setTruthy(false)
                      setNum(sum+button.name)
                    
                      
                     
                    }
                    else {
                      return false
                    }
                  
                  break
                  default:
                    return false
          }
               
              }
             if (sym === '\xD7') {
              
               if (typeof calc !== 'number') {
                
                if (operand%Math.round(operand) !== 0) {
                  
                  if (Math.ceil(operand) === 1) {
                    array1.push(parseFloat(operand));
                  }
                  else {
                    if (isNaN(operand%Math.round(operand))) {
                      setSym('\xD7');
                      setTruthy(false)
                    }
                    else {
                    array1.push(parseFloat(operand));
                    }
                  }

                }
                else {
                array1.push(parseInt(operand));
               
                }
                    
                setOperand('');
                      
                const multiply = array1.reduce(
                  (previousValue, currentValue) => {
                    if (typeof currentValue !== 'number') {
                      array1.splice(array1.indexOf(currentValue), 1);
                     
                      return false
                    }
                    else {
                     
                      return previousValue * currentValue
                    }
                    });
                    
                if (typeof multiply === 'number') {
                 
                  setCalc(multiply);
                  setOperand('');
                  setSym('\xD7');
                  setTruthy(false)
                  setNum(multiply+button.name)
                  array1 = [];
                  array1.push(multiply)
                  
                }
                else {
                  if (typeof array1[0] === 'number') {
                  setNum(array1[0]+button.name)
                  }
                  else {
                    return false
                  }
                }
                 
               }
               else {
               
                
                if (operand%Math.round(operand) !== 0) {
                  if (Math.ceil(operand) === 1) {
                    array1.push(parseFloat(operand));
                  }
                  else {
                    if (isNaN(operand%Math.round(operand))) {
                      return false
                    }
                    else {
                    array1.push(parseFloat(operand));
                    }
                  }

                }
                else {
                array1.push(parseInt(operand));
                
                }
                    
                setOperand('');
  
                const multiply = array1.reduce(
                  (previousValue, currentValue) => {
                    if (typeof currentValue !== 'number') {
                      array1.splice(array1.indexOf(currentValue), 1);
                      return false
                    }
                    else {
                      return previousValue * currentValue
                    }
                    });

                if (typeof multiply === 'number') {
                  

                  if (array1.length === 1) {
                    let a = calc + array1[0]
                    setCalc(a);
                    setOperand('');
                    setSym('\xD7');
                    setTruthy(false)
                    setNum(a+button.name)
                    array1.push(calc)
                    
                  }  
                  else {
                  setCalc(multiply);
                  setOperand('');
                  setSym('+');
                  setTruthy(false)
                  setNum(multiply+button.name);
                  array1 = [];
                  array1.push(multiply)
                }
              }
                else {
                  return false
                }
               }
             
              
             
             
             } 
              break

          case '=':
            setEquals(1)
            if (typeof calc === 'number') {
              array1 = [];
              array1.push(calc)
            }
                 if (operand === '') {
                   return false
                 }
          
                 else {
                  if (operand%Math.round(operand) !== 0) {
                    array1.push(parseFloat(operand));
                      }
                   else {
                    
                    array1.push(parseInt(operand));
                   
                        }
            switch (sym) {
              case '+': 
              const sum = array1.reduce(
                (previousValue, currentValue) => {
                  if (typeof currentValue !== 'number') {
                    array1.pop(currentValue)
                    return false
                  }
                  else {
                    return previousValue + currentValue
                  }
                  });

              if (typeof sum === 'number') {
                if (String(sum).match(/\d/g).length > 14) {
                  const text = document.getElementsByClassName('input-text')[0];
                  text.style.fontSize = '2.2rem';
                }
                setCalc([]);
                setOperand('');
                setSym('+');
                setTruthy(false)
                setNum(sum);
                array1 = [];
                array1.push(sum)
              }
              else {
                return false
              }
              
              break
              case '\u2013': 
              
              const diff = array1.reduce(
                (previousValue, currentValue) => {
                  if (typeof currentValue !== 'number') {
                    array1.pop(currentValue)
                    return false
                  }
                  else {
                    return previousValue - currentValue
                  }
                  });

              if (typeof diff === 'number') {
                if (String(diff).match(/\d/g).length > 14) {
                  const text = document.getElementsByClassName('input-text')[0];
                  text.style.fontSize = '2.2rem';
                }
                setCalc([]);
                setOperand('');
                setSym('\u2013');
                setTruthy(false)
                setNum(diff)
                array1 = [];
                array1.push(diff)
               
              }
              else {
                return false
              }
              break
              case '\xD7': 
              const multiply = array1.reduce(
                (previousValue, currentValue) => {
                  if (typeof currentValue !== 'number') {
                    array1.pop(currentValue)
                    return false
                  }
                  else {
                    return previousValue * currentValue
                  }
                  });

              if (typeof multiply === 'number') {
                if (String(multiply).match(/\d/g).length > 14) {
                  const text = document.getElementsByClassName('input-text')[0];
                  text.style.fontSize = '2.2rem';
                }
                setCalc([]);
                setOperand('');
                setSym('\xD7');
                setTruthy(false)
                setNum(multiply);
                array1 = [];
                array1.push(multiply)
              }
              else {
                return false
              }
              
              break
              case '\xF7': 
              const divide = array1.reduce(
                (previousValue, currentValue) => {
                  if (currentValue === 0) {
                    array1.pop(currentValue)
                    return 'Can\'t Divide by Zero'
                  }
                  else {
                    return previousValue / currentValue
                  }
                  });

              if (typeof divide === 'number') {
                if (String(divide).match(/\d/g).length > 14) {
                  const text = document.getElementsByClassName('input-text')[0];
                  text.style.fontSize = '2.2rem';
                }
                setCalc([]);
                setOperand('');
                setSym('\xF7');
                setTruthy(false)
                setNum(divide)
                array1 = [];
                array1.push(divide)
              }
              else {
                setNum('')
                setCalc(divide)
              }
              break
                  default:
                    return false
          }
        }
            break
        default:
        if (num.length < 14) {
        setNum(num+button.name);
        setOperand(operand+button.name);
        setCalc([]);
        }
        else {
 
          setCalc('Max Digits Reached')
          setNum([]);
          setOperand([]);
        }
        
      }}} key={button.key} style={button.style} className='calc-buttons'>
        {button.name}
      </div>
    )
  })


  return (
    <div className="App">
    
        <div className='calc-cta'>
        <div className='input-area'>
       <input className='input-text' defaultValue={num} disabled/>
        <div className='output'><span>{calc}</span></div>
      </div>
          {buttonMap}
        </div>
        
        <p>Created by <a rel="noreferrer" target='_blank' href='https://egbonjefri.github.io/'>@egbonjefri</a> for freeCodeCamp</p>
    </div>
  );
}

export default App;
