function predecessor(position, string) {
    const ops = ['+', '-', '÷', 'x']
    let toProceed = true
    let preceeding_num = ''
    while (toProceed) {
        position--
        if (position < 0) {
            toProceed = false
        } else {
            if (!ops.includes(string[position])) {
                preceeding_num = preceeding_num.padStart(preceeding_num.length + 1, string[position])
            } else {
                toProceed = false
            }
        }
    }
    return {
        cutoff_before: position + 1,
        number_before: Number(preceeding_num)
    };
}
function succeedor(position, string) {
    const ops = ['+', '-', '÷', 'x']
    let toProceed = true
    let succeeding_num = ''
    while (toProceed) {
        position++
        if (position >= string.length) {
            toProceed = false
        } else {
            if (!ops.includes(string[position])) {
                succeeding_num = succeeding_num.padEnd(succeeding_num.length + 1, string[position])
            } else {
                toProceed = false
            }
        }
    }
    return {
        cutoff_after: position,
        number_after: Number(succeeding_num)
    };
}
function evaluator(before, sign, after) {
    switch (sign) {
        case '÷':
            return before / after;
        case 'x':
            return before * after;
        case '+':
            return before + after;
        case '-':
            return before - after;
        case '%':
            return 0.01 * before
    }
}
function operators(string) {
    let container = {
        '+': [],
        '-': [],
        'x': [],
        '÷': [],
        '%': []
    }
    let ops = Object.keys(container)
    for (let i = 0; i < string.length; i++) {
        if (ops.includes(string[i])) {
            container[string[i]].push(i)
        }
    }
    return container;
}
function displayer(string) {
    if (string.includes('.')) {
        let [, fraction] = string.split('.')
        if (fraction.length > 6) {
            const Rounded_num = String(Number(string).toFixed(6))
            return Rounded_num
        } else {
            return String(Number(string))
        }
    } else {
        return String(Number(string))
    }
}
function calculate(expression) {
    let c1 = expression;
    if(c1 === ''){
        return null
    }
    let li = c1[c1.length - 1]
    const req_ops = ['%', '÷', 'x']
    const nonper_ops = ['x', '÷']
    const nonreq_ops = ['-', '+']
    if (nonper_ops.includes(li)) {
        return 'e'
    } else {
        let operator_Position = operators(expression)
        req_ops.forEach(item => {
            let current_Positions = operator_Position[item]

            while (current_Positions.length) {
                let cur_index = current_Positions[0]
                let { cutoff_before, number_before } = predecessor(cur_index, c1)
                let { cutoff_after, number_after } = succeedor(cur_index, c1)
                c1 = c1.substring(0, cutoff_before) + String(evaluator(number_before, item, number_after)) + c1.substring(cutoff_after)
                operator_Position = operators(c1)
                current_Positions = operator_Position[item]
            }
        })
        if (c1 !== '-') {
            if (!nonreq_ops.includes(c1[0])) {
                c1 = c1.padStart(c1.length + 1, '+')
            }
            let should_continue = false
            console.log(c1)
            for (let i = 1; i < c1.length; i++) {
                if (nonreq_ops.includes(c1[i])) {
                    console.log('included');
                    should_continue = true
                }
            }
            if (should_continue) {
                let operator_Position = operators(c1)
                let new_num = 0
                nonreq_ops.forEach(item => {
                    let current_Positions = operator_Position[item]
                    for (let i = 0; i < current_Positions.length; i++) {
                        let cur_index = current_Positions[i]
                        let { cutoff_after, number_after } = succeedor(cur_index, c1)
                        new_num += Number(item + number_after)
                    }
                })
                c1 = String(new_num)
            }
        }
        return displayer(c1)
    }
}

export default calculate;