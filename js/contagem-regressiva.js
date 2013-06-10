(function() {
  var Contador, atualizarNum, contador, contarDias, hoje, impar, par;

  hoje = new Date();

  par = function(x) {
    return (x % 2) === 0;
  };

  impar = function(x) {
    return !par(x);
  };

  contarDias = function(meses, dias) {
    if (par(meses)) {
      if (meses === 2) {
        dias += 28;
      } else {
        dias += 30;
      }
    }
    if (impar(meses)) {
      dias += 31;
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
      this.hAno = final.getFullYear() - hoje.getFullYear();
      this.hMes = hoje.getMonth() + 1;
      this.hHoras = final.getHours() - hoje.getHours();
      this.hMin = final.getMinutes() - hoje.getMinutes();
      this.hSec = final.getSeconds() - hoje.getSeconds();
      this.hDia = final.getDate() - hoje.getDate();
      this.dias = function() {
        var dias, meses, _results;

        dias = 0;
        meses = this.hMes;
        _results = [];
        while (this.fMes > meses) {
          contarDias(meses, dias);
          meses -= 1;
          _results.push(console.log(dias));
        }
        return _results;
      };
      console.log(this.hAno + ' ' + this.hMes + ' ' + this.hDia + ' ' + this.hHoras + ' ' + this.hMin + ' ' + this.hSec);
      atualizarNum('#segundos', this.hSec);
      atualizarNum('#minutos', this.hMin);
      atualizarNum('#segundos', this.hSec);
      atualizarNum('#segundos', this.hSec);
      this.contar = function() {
        var diasFaltando;

        diasFaltando = this.dias;
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

  setTimeout(contador.contar(), 500);

}).call(this);
