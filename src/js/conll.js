export const conll = `lang1 = wiy
lang2 = eng

# sent_id = sample-1/wiy
# text = Kitko kowoliswilh.
1\tkitko\t_\tAUX\t_\t_\t2\taux\t_\tsample-1/eng#2,sample-1/eng#3,sample-1/eng#4
2\tkowoliswilh\t_\tVERB\t_\t_\t0\troot\t_\tsample-1/eng#5,sample-1/eng#6,sample-1/eng#7
3\t.\t_\tPUNCT\t_\t_\t2\tpunct\t_\tsample-1/eng#8

# sent_id = sample-1/eng
# text = He's going to start to sing.
1\the\t_\tPRON\t_\t_\t3\tnsubj\t_\t_
2\tis\t_\tAUX\t_\t_\t3\taux\t_\tsample-1/wiy#1
3\tgoing\t_\tVERB\t_\t_\t0\troot\t_\tsample-1/wiy#1
4\tto\t_\tPART\t_\t_\t5\tmark\t_\tsample-1/wiy#1
5\tstart\t_\tVERB\t_\t_\t3\txcomp\t_\tsample-1/wiy#2
6\tto\t_\tPART\t_\t_\t7\tmark\t_\tsample-1/wiy#2
7\tsing\t_\tVERB\t_\t_\t5\txcomp\t_\tsample-1/wiy#2
8\t.\t_\tPUNCT\t_\t_\t3\tpunct\t_\tsample-1/wiy#3

# sent_id = sample-2/wiy
# text = Ho'rach kitko kowa boyaga'rabiyutw.
1\tho'rach\t_\tNOUN\t_\t_\t4\tobj\t_\tsample-2/eng#9
2\tkitko\t_\tAUX\t_\t_\t4\taux\t_\tsample-2/eng#2,sample-2/eng#3,sample-2/eng#4
3\tkowa\t_\tAUX\t_\t_\t4\taux\t_\t_
4\tboyaga'rabiyutw\t_\tVERB\t_\t_\t0\troot\t_\tsample-2/eng#5,sample-2/eng#6,sample-2/eng#7,sample-2/eng#8
5\t.\t_\tPUNCT\t_\t_\t4\tpunct\t_\tsample-2/eng#10

# sent_id = sample-2/eng
# text = I'm going to tell a story about Snake.
1\tI\t_\tPRON\t_\t_\t3\tnsubj\t_\t_
2\tam\t_\tAUX\t_\t_\t3\taux\t_\tsample-2/wiy#2
3\tgoing\t_\tVERB\t_\t_\t0\troot\t_\tsample-2/wiy#2
4\tto\t_\tPART\t_\t_\t5\tmark\t_\tsample-2/wiy#2
5\ttell\t_\tVERB\t_\t_\t3\txcomp\t_\tsample-2/wiy#4
6\ta\t_\tDET\t_\t_\t7\tdet\t_\tsample-2/wiy#4
7\tstory\t_\tNOUN\t_\t_\t5\tobj\t_\tsample-2/wiy#4
8\tabout\t_\tPREP\t_\t_\t9\tcase\t_\tsample-2/wiy#4
9\tSnake\t_\tNOUN\t_\t_\t7\tnmod\t_\tsample-2/wiy#1
10\t.\t_\tPUNCT\t_\t_\t3\tpunct\t_\tsample-2/wiy#5

# sent_id = sample-3/wiy
# text = Kuts katagana dakw hu tobiwi', to pat ki to diyabakwilh, to warog ki to diyabakwilh, kuts katagana dakw hu totuti'.
1\tkuts\t_\tADV\t_\t_\t3\tnsubj\t_\t_
2\tkatagana\t_\tADV\t_\t_\t3\taux\t_\tsample-3/eng#2
3\tdakw\t_\tVERB\t_\t_\t0\troot\t_\tsample-3/eng#2
4\thu\t_\tPART\t_\t_\t5\tmark\t_\tsample-3/eng#2
5\ttobiwi'\t_\tNOUN\t_\t_\t3\txcomp\t_\tsample-3/eng#4
6\t,\t_\tPUNCT\t_\t_\t7\tdet\t_\tsample-3/eng#4
7\tto\t_\tADV\t_\t_\t5\tobj\t_\tsample-3/eng#4
8\tpat\t_\tNOUN\t_\t_\t9\tcase\t_\tsample-3/eng#4
9\tki\t_\tADV\t_\t_\t7\tnmod\t_\tsample-3/eng#1
10\tto\t_\tAUX\t_\t_\t7\tnmod\t_\tsample-3/eng#1
10\tdiyabakwilh\t_\tVERB\t_\t_\t3\tpunct\t_\tsample-3/eng#5
11\t,\t_\tPUNCT\t_\t_\t3\tpunct\t_\tsample-3/eng#5
12\tto\t_\tADV\t_\t_\t3\tpunct\t_\tsample-3/eng#5
13\twarog\t_\tNOUN\t_\t_\t3\tpunct\t_\tsample-3/eng#5
14\tki\t_\tADV\t_\t_\t3\tpunct\t_\tsample-3/eng#5
15\tto\t_\tAUX\t_\t_\t3\tpunct\t_\tsample-3/eng#5
16\tdiyabakwilh\t_\tVERB\t_\t_\t3\tpunct\t_\tsample-3/eng#5
17\t,\t_\tPUNCT\t_\t_\t3\tpunct\t_\tsample-3/eng#5
18\tkuts\t_\tADV\t_\t_\t3\tpunct\t_\tsample-3/eng#5
19\tkatagana\t_\tADV\t_\t_\t3\tpunct\t_\tsample-3/eng#5
20\tdakw\t_\tVERB\t_\t_\t3\tpunct\t_\tsample-3/eng#5
21\thu\t_\tPART\t_\t_\t3\tpunct\t_\tsample-3/eng#5
22\ttotuti'\t_\tNOUN\t_\t_\t3\tpunct\t_\tsample-3/eng#5
23\t.\t_\tPUNCT\t_\t_\t3\tpunct\t_\tsample-3/eng#5

# sent_id = sample-3/eng
# text = It's very nice eating, soot never sticks to it much, coals never stick to it much, it cooks very nicely.
1\tIt\t_\tPRON\t_\t_\t3\tnsubj\t_\t_
2\tis\t_\tAUX\t_\t_\t3\taux\t_\tsample-3/wiy#2
3\tvery\t_\tADV\t_\t_\t0\troot\t_\tsample-3/wiy#2
4\tnice\t_\tADJ\t_\t_\t5\tmark\t_\tsample-3/wiy#2
5\teating\t_\tNOUN\t_\t_\t3\txcomp\t_\tsample-3/wiy#4
6\t,\t_\tPUNCT\t_\t_\t7\tdet\t_\tsample-3/wiy#4
7\tsoot\t_\tNOUN\t_\t_\t5\tobj\t_\tsample-3/wiy#4
8\tnever\t_\tADV\t_\t_\t9\tcase\t_\tsample-3/wiy#4
9\tsticks\t_\tVERB\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
10\tto\t_\tPREP\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
11\tit\t_\tPRON\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
12\tmuch\t_\tADV\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
13\t,\t_\tPUNCT\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
14\tcoals\t_\tNOUN\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
15\tnever\t_\tADV\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
16\tstick\t_\tVERB\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
17\tto\t_\tPREP\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
18\tit\t_\tPRON\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
19\tmuch\t_\tADV\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
20\t,\t_\tPUNCT\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
21\tit\t_\tPRON\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
22\tcooks\t_\tVERB\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
23\tvery\t_\tADV\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
24\tnicely\t_\tADV\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
25\t.\t_\tPUNCT\t_\t_\t7\tnmod\t_\tsample-3/wiy#1
\n\n\n
`
