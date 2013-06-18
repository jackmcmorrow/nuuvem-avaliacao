var Contador, Relogio, atualizarNum, contador, contar, contarMeses, df, eh_impar, eh_par, hf, hoje, mf, relogio, sf;

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
    $($obj + ' .dec').text('0');
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
    this.dHoras = Math.abs((this.fHoras - this.hHoras) - 1);
    this.dMin = Math.abs(60 - this.hMin);
    this.dSec = Math.abs(this.fSec - this.hSec);
    atualizarNum('#segundos', this.dSec);
    atualizarNum('#minutos', this.dMin);
    atualizarNum('#horas', this.dHoras);
    atualizarNum('#dias', this.dDia);
  }

  return Contador;

})();

Relogio = (function() {
  function Relogio(diasFaltando, horasFaltando, minutosFaltando, segundosFaltando) {
    this.diasFaltando = diasFaltando;
    this.horasFaltando = horasFaltando;
    this.minutosFaltando = minutosFaltando;
    this.segundosFaltando = segundosFaltando;
  }

  return Relogio;

})();

contador = new Contador(12, 8, 2013, 19, 0, 0);

relogio = new Relogio(contador.dDia, contador.dHoras, contador.dMin, contador.dSec);

$(document).ready(function() {});

df = relogio.diasFaltando;

hf = relogio.horasFaltando;

mf = relogio.minutosFaltando;

sf = relogio.segundosFaltando;

contar = function() {
  atualizarNum('#dias', df);
  sf -= 1;
  if (hf < 0) {
    df -= 1;
    hf = 23;
    atualizarNum('#dias', df);
    atualizarNum('#horas', hf);
  }
  if (mf <= 0) {
    hf -= 1;
    mf = 59;
    atualizarNum('#minutos', mf);
    atualizarNum('#horas', hf);
  }
  if (sf <= 0) {
    mf -= 1;
    sf = 60;
    atualizarNum('#minutos', mf);
    atualizarNum('#segundos', sf);
  }
  return atualizarNum('#segundos', sf);
};
