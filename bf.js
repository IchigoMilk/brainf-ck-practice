const MEM_R = 20;
const MEM_C = 10;
const INS_R = 10;
const INS_C = 50;
const MEM_SIZE = MEM_R * MEM_C;
const INS_SIZE = INS_R * INS_C;

var mem = [MEM_SIZE];
var ins = [INS_SIZE];
var memptr;
var insptr;
var insLength;
var disp;

function $(obj)
{
    return document.getElementById(obj);
}

onload = function()
{
	var i;
	
	for (i = 0; i < INS_SIZE; ++i)
	{
		ins[i] = 0;
	}
	
	for (i = 0; i < MEM_SIZE; ++i)
	{
		mem[i] = 0;
	}
	
	memPtr = 0;
	insPtr = 0;
	disp = '';
	
	refresh();
}

function setIns()
{
	var i;
	
	var s = $('program').value.replace(/[^\+\-\[\]\.><]/g, '');
	insLength = s.length;
	
	for (i = 0; i < insLength; ++i)
	{
		ins[i] = s.charAt(i);
	}
	
	$('program').value = '';
}

function alignNum(n)
{
	var tmp = '000' + n;
	return tmp.substring(tmp.length - 3, tmp.length);
}

function refresh()
{
	var strIns = '';
	var strMem = '';
	var i, j;
	
	for (i = 0; i < INS_R; ++i)
	{
		for (j = 0; j < INS_C; ++j)
		{
			index = i * INS_C + j;
			if (insPtr == index)
			{
				strIns += "<span style='background-color:#ccc'>" + ins[index] + '</span>';
			}
			else
			{
				strIns += "<span>" + ins[index] + '</span>';
			}
		}
		strIns += '<br />';
	}
	
	for (i = 0; i < MEM_R; ++i)
	{
		for (j = 0; j < MEM_C; ++j)
		{
			index = i * MEM_C + j;
			if (memPtr == index)
			{
				strMem += "<span style='background-color:#ccc'>" + alignNum(mem[index]) + '</span> ';
			}
			else
			{
				strMem += "<span>" + alignNum(mem[index]) + '</span> ';
			}
		}
		strMem += '<br />';
	}
	
	$('ins').innerHTML = strIns;
	$('memory').innerHTML = strMem;
	$('result').innerHTML = disp;
}

function go(isSeq)
{
	var i, j;

//	if (insPtr < insLength)
	while (insPtr < insLength)
	{
		switch (ins[insPtr])
		{
			case '>':
				++memPtr;
				break;
			case '<':
				--memPtr;
				break;
			case '+':
				++mem[memPtr];
				break;
			case '-':
				--mem[memPtr];
				break;
			case '.':
				disp += String.fromCharCode(mem[memPtr]);
				break;
			case ',':
				break;
			case '[':
				if (mem[memPtr] == 0){
					++insPtr;
					for (j = 1; j > 0; ++insPtr)
					{
						if (ins[insPtr] === '[')
						{
							++j;
						}
						if (ins[insPtr] === ']')
						{
							--j;
						}	
					}
					--insPtr;
				}
				break;
			case ']':
				--insPtr;
				for (j = 1; j > 0; --insPtr)
				{
					if (ins[insPtr] === '[')
					{
						--j;
					}
					if (ins[insPtr] === ']')
					{
						++j;
					}					
				}
				break;
		}
		++insPtr;
		
		if (!isSeq)
		{
			refresh();
			return;
		}
//		setTimeout(go(1), 0);	
	}
	refresh();
}

