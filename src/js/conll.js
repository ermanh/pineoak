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
`
