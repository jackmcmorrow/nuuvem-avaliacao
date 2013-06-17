hoje = new Date()
eh_par = (x) -> (x % 2) == 0
eh_impar = (x) -> not eh_par x

contarMeses = (meses, dias) -> #tá ok
	@dias = dias
	if eh_par meses
		if meses is 2 
			dias = dias + 28
			#console.log 'fevereiro'
		else 
			dias = dias + 30
			#console.log 'mes com trinta'
	else
		dias = dias + 31
		#console.log 'mes com trinta e um'
	dias

atualizarNum = ($obj, val) -> #tá ok
	if val >= 10 
		alg = val.toString().split("");
		$($obj + ' .dec').text(alg[0])
		$($obj + ' .uni').text(alg[1])
	else
		$($obj + ' .dec').text('0')	
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

		@meses = () ->
			anos = @hAno
			fimAnos = @fAno
			deltaAnos = fimAnos - anos
			
			meses = @hMes
			fimMeses = @fMes
			deltaMeses = @fMes - @hMes

			if fimAnos > anos 
				deltaMeses += Math.abs deltaAnos * 12

			return deltaMeses
		
		@dias = () ->
			a = 0 #variação de dias em cada mês
			meses = @hMes
			fimMeses = @fMes - 1
			fimDia = @fDia

			while fimMeses > meses
				a = contarMeses fimMeses, a
				fimMeses -= 1
				
			x = 0 #dias até esse mês acabar
			x += contarMeses @hMes, x
			return Math.abs (x - @hDia) + a + fimDia




		#Delta, a variação
		@dAno 	= Math.abs @fAno - @hAno
		@dMes 	= Math.abs @fMes - @hMes
		@dDia 	= @dias()
		@dHoras = Math.abs (@fHoras - @hHoras) - 1 #para deixar os minutos contarem
		@dMin 	= Math.abs @fMin - @hMin
		@dSec 	= Math.abs @fSec - @hSec

		

		console.log @hAno + ' ' + @hMes + ' ' + @hDia + ' ' + @hHoras + ' ' + @hMin + ' ' + @hSec
		console.log @fAno + ' ' + @fMes + ' ' + @fDia + ' ' + @fHoras + ' ' + @fMin + ' ' + @fSec
		console.log @dAno + ' ' + @dMes + ' ' + @dDia + ' ' + @dHoras + ' ' + @dMin + ' ' + @dSec
		
		atualizarNum '#segundos', @dSec
		atualizarNum '#minutos', @dMin
		atualizarNum '#horas', @dHoras
		atualizarNum '#dias', @dDia


		
			#console.log atualizarNum '#segundos', segundosFaltando

class Relogio
	constructor: (@diasFaltando, @horasFaltando, @minutosFaltando, @segundosFaltando) ->

contador = new Contador 12, 8, 2013, 19, 0, 0 #data
relogio = new Relogio contador.dDia, contador.dHoras, contador.dMin, contador.dSec

console.log relogio
#contador = new Contador 14, 10, 2014, 19, 0, 0
$(document).ready ->
	#setTimeout contar(), 1000
	#console.log 'fuck'

df = relogio.diasFaltando
hf = relogio.horasFaltando
mf = relogio.minutosFaltando
sf = relogio.segundosFaltando

contar = () ->
	atualizarNum '#dias', df
	sf -= 1
	
	if hf < 0
		df -= 1
		hf = 23
		atualizarNum '#horas', hf

	if mf <= 0
		hf -= 1
		mf = 60
		atualizarNum '#minutos', mf

	if sf <= 0
		mf -= 1
		sf = 60
	
	atualizarNum '#segundos', sf
	console.log sf
	setTimeout esperar(), 1000

esperar = () ->
	setTimeout contar(), 1000

