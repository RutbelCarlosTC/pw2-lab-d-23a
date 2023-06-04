from colors import *
class Picture:
  def __init__(self, img):
    self.img = img

  def __eq__(self, other):
    return self.img == other.img

  def _invColor(self, color):
    if color not in inverter:
      return color
    return inverter[color]

  def verticalMirror(self):
    """ Devuelve el espejo vertical de la imagen """
    vertical = []
    cadAux = ""
    for i in range(0, len(self.img)):
        for j in range(0, len(self.img[i])):
            cadAux = self.img[i][j] + cadAux; 
        vertical.append(cadAux)
        cadAux = ""
    
    return Picture(vertical)

  def horizontalMirror(self):
    """ Devuelve el espejo horizontal de la imagen """
    horizontal = []

    for i in range(len(self.img)-1,-1,-1):
        horizontal.append(self.img[i])

    return Picture(horizontal)

  def negative(self):
    """ Devuelve un negativo de la imagen """
    negative = []
    aux = ""
    for i in range(0,len(self.img)):
        for j in range(0, len(self.img[i])):
            aux += self._invColor(self.img[i][j])
        negative.append(aux)
        aux = ""
    return Picture(negative)

  def join(self, p):
    """ Devuelve una nueva figura poniendo la figura del argumento 
        al lado derecho de la figura actual """
    img =[]
    aux = ""
    for i in range(0,len(self.img)):
        aux += self.img[i] + p.img[i]
        img.append(aux)
        aux = ""
    return Picture(img)

  def up(self, p):
    """Devuelve una nueva figura poniendo la figura actual sofre otra figura p"""
    img = []
    aux = ""
    for i in range(0, len(self.img)):
        for j in range(0,len(self.img[i])):
            if (self.img[i][j] == " "):
                aux += p.img[i][j]
            else:
                aux += self.img[i][j]
        img.append(aux)
        aux = ""
    
    return Picture(img)

  def under(self, p):
    """ Devuelve una nueva figura poniendo la figura p sobre la
        figura actual """
    img = []
    aux = ""
    for i in range(0,len(p.img)):
        for j in range(0,len(p.img[i])):
            if (p.img[i][j] == ' '):
                aux += self.img[i][j]
            else:
                aux += p.img[i][j]
        img.append(aux)
        aux = ""
    return Picture(img)
  
  def horizontalRepeat(self, n):
    """ Devuelve una nueva figura repitiendo la figura actual al costado
        la cantidad de veces que indique el valor de n """
    img = []
    aux = "" 
    for i in  range(0,len(self.img)):
        for j in range(0,n):
            aux += self.img[i]
        img.append(aux)
        aux = ""
    return Picture(img)

  def verticalRepeat(self, n):
    img = []
    for i in range(0,n):
        img += self.img
    return Picture(None)

  #Extra: Sólo para realmente viciosos 
  def rotate(self):
    """Devuelve una figura rotada en 90 grados, puede ser en sentido horario
    o antihorario"""
    #antihorario:
    rotado = []
    for j in range(len(self.img[0]) - 1, -1, -1):
        aux = ""
        for i in range(len(self.img)):
            aux += self.img[i][j]
        rotado.append(aux)

    return Picture(rotado)
