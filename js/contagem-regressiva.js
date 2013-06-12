(function() {
  var Contador, atualizarNum, contador, contarDias, eh_impar, eh_par, hoje;

  hoje = new Date();

  eh_par = function(x) {
    return (x % 2) === 0;
  };

  eh_impar = function(x) {
    return !eh_par(x);
  };

  contarDias = function(meses, dias) {
    if (eh_par(meses)) {
      if (meses === 2) {
        dias += 28;
      } else {
        dias += 31;
      }
    }
    if (eh_impar(meses)) {
      dias += 30;
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
      this.dias = function() {
        var a, meses, _results;

        a = 0;
        meses = this.hMes;
        _results = [];
        while (this.fMes > this.hMes) {
          contarDias(meses, a);
          _results.push(meses -= 1);
        }
        return _results;
      };
      this.dAno = this.fAno - this.hAno;
      this.dMes = this.fMes - this.hMes;
      this.dDia = this.dias;
      this.dHoras = this.fHoras - this.hHoras;
      this.dMin = this.fMin - this.hMin;
      this.dSec = this.fSec - this.hSec;
      console.log(this.hAno + ' ' + this.hMes + ' ' + this.hDia + ' ' + this.hHoras + ' ' + this.hMin + ' ' + this.hSec);
      atualizarNum('#segundos', this.dSec);
      atualizarNum('#minutos', this.dMin);
      atualizarNum('#horas', this.dSec);
      atualizarNum('#dias', this.dias);
      this.contar = function() {
        var diasFaltando;

        diasFaltando = this.dias(0);
        console.log(diasFaltando);
        atualizarNum('#dias', diasFaltando);
        if (this.hHoras < 0) {
          this.dias -= 1;
          this.hHoras = 23;
          atualizarNum('#horas', this.hHoras);
        }
        if (this.hMin <= 0) {
          this.hHoras -= 1;
          this.hMin = 60;
          atualizarNum('#minutos', this.hMin);
        }
        if (this.hSec <= 0) {
          this.hMin -= 1;
          this.hSec = 60;
        }
        atualizarNum('#segundos', this.hSec);
        return this.hSec -= 1;
      };
    }

    return Contador;

  })();

  contador = new Contador(12, 8, 2013, 19, 0, 0);

}).call(this);
