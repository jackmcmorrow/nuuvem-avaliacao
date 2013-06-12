hoje = new Date()
eh_par = (x) -> (x % 2) == 0
eh_impar = (x) -> not eh_par x

contarDias = (meses, dias) -> #tá ok
	if eh_par meses
		if meses is 2 
			dias += 28
		else 
			dias += 31
	if eh_impar meses 
		dias += 30
	dias

atualizarNum = ($obj, val) -> #tá ok

	if val >= 10
		alg = val.toString().split("");
		$($obj + ' .dec').text(alg[0])
		$($obj + ' .uni').text(alg[1])
	else
		$($obj + ' .uni').text(val)	
	

class Contador
	constructor : (@fDia, @fMes, @fAno, @fHoras, @fMin, @fSec) ->
		final = new Date(@fAno, @fMes, @fDia, @fHoras, @fMin, @fSec)
		#hoje
		@hAno = hoje.getFullYear()
		@hMes = hoje.getMonth() + 1
		@hHoras = hoje.getHours() 
		@hMin = hoje.getMinutes() 
		@hSec = hoje.getSeconds() 
		@hDia = hoje.getDate()
		
		@dias = ->
			a = 0
			meses = @hMes
			while @fMes > @hMes
				contarDias meses, a
				meses -= 1
				#console.log a

		#Delta, a variação
		@dAno 	= @fAno - @hAno
		@dMes 	= @fMes - @hMes
		@dDia 	= @dias;
		@dHoras = @fHoras - @hHoras
		@dMin 	= @fMin - @hMin
		@dSec 	= @fSec - @hSec

		

		console.log @hAno + ' ' + @hMes + ' ' + @hDia + ' ' + @hHoras + ' ' + @hMin + ' ' + @hSec
		
		atualizarNum '#segundos', @dSec
		atualizarNum '#minutos', @dMin
		atualizarNum '#horas', @dSec
		atualizarNum '#dias', @dias

		@contar = () ->
			diasFaltando = @dias 0
			console.log diasFaltando

			atualizarNum '#dias', diasFaltando

			if @hHoras < 0
				@dias -= 1
				@hHoras = 23
				atualizarNum '#horas', @hHoras

			if @hMin <= 0
				@hHoras -= 1
				@hMin = 60
				atualizarNum '#minutos', @hMin

			if @hSec <= 0
				@hMin -= 1
				@hSec = 60
			atualizarNum '#segundos', @hSec

			@hSec -= 1

contador = new Contador 12, 8, 2013, 19, 0, 0
#setTimeout contador.contar(), 100000000