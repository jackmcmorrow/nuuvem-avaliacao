var Contador, atualizarNum, contador, contarMeses, eh_impar, eh_par, hoje;

hoje = new Date();

eh_par = function(x) {
  return (x % 2) === 0;
};

eh_impar = function(x) {
  return !eh_par(x);
};

contarMeses = function(meses, dias) {
  this.dias = dias;
  if (eh_par(meses)) {
    if (meses === 2) {
      dias = dias + 28;
    } else {
      dias = dias + 30;
    }
  } else {
    dias = dias + 31;
  }
  return dias;
};

atualizarNum = function($obj, val) {
  var alg;

  if (val >= 10) {
    alg = val.toString().split("");
    $($obj + ' .dec').text(alg[0]);
    return $($obj + ' .uni').text(alg[1]);
  } else {
    $($obj + ' .uni').text('0');
    return $($obj + ' .uni').text(val);
  }
};

Contador = (function() {
  function Contador(fDia, fMes, fAno, fHoras, fMin, fSec) {
    var final;

    this.fDia = fDia;
    this.fMes = fMes;
    this.fAno = fAno;
    this.fHoras = fHoras;
    this.fMin = fMin;
    this.fSec = fSec;
    final = new Date(this.fAno, this.fMes, this.fDia, this.fHoras, this.fMin, this.fSec);
    this.hAno = hoje.getFullYear();
    this.hMes = hoje.getMonth() + 1;
    this.hHoras = hoje.getHours();
    this.hMin = hoje.getMinutes();
    this.hSec = hoje.getSeconds();
    this.hDia = hoje.getDate();
    this.meses = function() {
      var anos, deltaAnos, deltaMeses, fimAnos, fimMeses, meses;

      anos = this.hAno;
      fimAnos = this.fAno;
      deltaAnos = fimAnos - anos;
      meses = this.hMes;
      fimMeses = this.fMes;
      deltaMeses = this.fMes - this.hMes;
      if (fimAnos > anos) {
        deltaMeses += Math.abs(deltaAnos * 12);
      }
      return deltaMeses;
    };
    this.dias = function() {
      var a, fimDia, fimMeses, meses, x;

      a = 0;
      meses = this.hMes;
      fimMeses = this.fMes - 1;
      fimDia = this.fDia;
      while (fimMeses > meses) {
        a = contarMeses(fimMeses, a);
        fimMeses -= 1;
      }
      x = 0;
      x += contarMeses(this.hMes, x);
      return Math.abs((x - this.hDia) + a + fimDia);
    };
    this.dAno = Math.abs(this.fAno - this.hAno);
    this.dMes = Math.abs(this.fMes - this.hMes);
    this.dDia = this.dias();
    this.dHoras = Math.abs(this.fHoras - this.hHoras);
    this.dMin = Math.abs(this.fMin - this.hMin);
    this.dSec = Math.abs(this.fSec - this.hSec);
    console.log(this.hAno + ' ' + this.hMes + ' ' + this.hDia + ' ' + this.hHoras + ' ' + this.hMin + ' ' + this.hSec);
    console.log(this.fAno + ' ' + this.fMes + ' ' + this.fDia + ' ' + this.fHoras + ' ' + this.fMin + ' ' + this.fSec);
    console.log(this.dAno + ' ' + this.dMes + ' ' + this.dDia + ' ' + this.dHoras + ' ' + this.dMin + ' ' + this.dSec);
    atualizarNum('#segundos', this.dSec);
    atualizarNum('#minutos', this.dMin);
    atualizarNum('#horas', this.dHoras);
    atualizarNum('#dias', this.dDia);
    this.contar = function() {
      var diasFaltando, horasFaltando, minutosFaltando, segundosFaltando;

      diasFaltando = this.dDia;
      horasFaltando = this.dHoras;
      minutosFaltando = this.dMin;
      segundosFaltando = this.dSec;
      atualizarNum('#dias', diasFaltando);
      if (horasFaltando < 0) {
        diasFaltando = diasFaltando - 1;
        horasFaltando = 23;
        atualizarNum('#horas', horasFaltando);
      }
      if (minutosFaltando <= 0) {
        horasFaltando = horasFaltando - 1;
        minutosFaltando = 60;
        atualizarNum('#minutos', minutosFaltando);
      }
      if (segundosFaltando <= 0) {
        minutosFaltando = minutosFaltando - 1;
        segundosFaltando = 60;
      }
      atualizarNum('#segundos', segundosFaltando);
      this.segundosFaltando -= 1;
      return console.log(segundosFaltando);
    };
  }

  return Contador;

})();

contador = new Contador(12, 8, 2013, 19, 0, 0);
