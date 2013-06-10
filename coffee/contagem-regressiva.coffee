hoje = new Date()
par = (x) -> (x % 2) == 0
impar = (x) -> !par x

contarDias = (meses, dias) ->
	if par meses
		if meses is 2 
			dias += 28
		else 
			dias += 30
	if impar meses 
		dias += 31
	dias

atualizarNum = ($obj, val) ->
	if val >= 10
		alg = val.toString().split("");
		$($obj + ' .dec').text(alg[0])
		$($obj + ' .uni').text(alg[1])
	else
		$($obj + ' .uni').text(val)	
	

class Contador
	constructor : (@fDia, @fMes, @fAno, @fHoras, @fMin, @fSec) ->
		final = new Date(@fAno, @fMes, @fDia, @fHoras, @fMin, @fSec)
		@hAno = final.getFullYear() - hoje.getFullYear()
		@hMes = hoje.getMonth() + 1
		@hHoras = final.getHours() - hoje.getHours() 
		@hMin = final.getMinutes() - hoje.getMinutes() 
		@hSec = final.getSeconds() - hoje.getSeconds() 
		@hDia = final.getDate() - hoje.getDate()
		@dias = ->
			dias = 0
			meses = @hMes
			while @fMes > meses
				contarDias meses, dias
				meses -= 1
				console.log dias

		console.log @hAno + ' ' + @hMes + ' ' + @hDia + ' ' + @hHoras + ' ' + @hMin + ' ' + @hSec
		
		atualizarNum '#segundos', @hSec
		atualizarNum '#minutos', @hMin
		atualizarNum '#segundos', @hSec
		atualizarNum '#segundos', @hSec

		@contar = () ->
			diasFaltando = @dias
			#console.log @dias

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
setTimeout contador.contar(), 500