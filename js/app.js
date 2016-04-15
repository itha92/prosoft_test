//

//load codes from file
$.each(arr, function(i, val)
{
  	$('#codes').append('<option value="'+val.Code+'">');
});

$('.btn-success').on('click',function(){
	var date_raw = $('.sel_date').val();
	var days = $('.days').val();
	var code = $('.code').val();

	var holidays = [];

	var accept = true;

	//to do
	//validate all values
	if (date_raw === "" || typeof date_raw === undefined) {
		alert("Please write a valid date 'mm/dd/yyyy'");
		accept = false;
	}
	if (days < 1) {
		alert("Number of days can't be less than one");
		accept = false;
	}
	if (code === "" || typeof code === undefined) {
		alert("Code can't be blank");
		accept = false;
	}

	//show calendar


	if (accept) 
	{

		var year = date_raw.split('-')[0];
		var month = date_raw.split('-')[1];

		
		var number_of_months = days/30;

		month = parseInt(month)-1;

		var initial_day = date_raw.split('-')[2];
		var cont = days;
		var n = 0;
		
		for (var i = 0; i < number_of_months; i++) {
			$('#calendar').append('<div id="divCalendar' + i + '"></div>');
			if (month > 10) 
			{
				var c = new Calendar("divCalendar"+i, month , year, initial_day);
				c.showCurrent();
				month = 0 + i;
				year = parseInt(year)+1;
				getHolidays(code, year, month);

			}else{
				var c = new Calendar("divCalendar"+i, month , year, initial_day);
				c.showCurrent();
				month ++;
				getHolidays(code, year, month);
			}
		}
		
		var to_color = $('.current_day');
		var index = 0;

		$.each($('.current_day'), function(item, val)
		{
		  if($(val).hasClass('initial_day')){
		  	index = item;
		  }
		});
	
		if (cont > to_color.length) 
		{
			number_of_months++;
			var c = new Calendar("divCalendar"+number_of_months, month , year, initial_day);
			c.showCurrent();
			
		}
		
		for (var i = index; i < to_color.length ; i++) {
		  	if(cont !== 0){
		  		$(to_color[i]).css('background-color','green');
		  		match_date($(to_color[i]));
		  		cont--;
		  	}		  	
		}

	}
});
	
	var getHolidays = function(code, year, month){

				//get holidays :D
				$.ajax({
					url: 'http://holidayapi.com/v1/holidays',
					data:
					{
						'country' : code,
						'year' : year,
						'month' : month
					}
				}).done(function(data)
				{
					holidays = data.holidays;
					$('.holi_days').show();
					$.each(data.holidays, function(i, val){
						$('.list-group').append('<a href="#" class="list-group-item list-group-item-success">'+val.name+' -- Date: '+ val.date+'</a>')
					});
				});	
	}


	var match_date = function(to_cmp){
		var n =	$($('#divCalendar0 table tr td')[0]).text().split('-')[0];
		var index_month = Months.indexOf(n.trim());
		console.log(Months);
		//($($('#divCalendar0 table tr td')[0]).text().split('-')[0], $($('#divCalendar0 table tr td')[0]).text().split('-')[1])
	};