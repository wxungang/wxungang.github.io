gen_demo();

function gen_demo(params) {
  let result;
  function* gen(num = 0) {
    result = yield 'generator function ' + num;
    console.log(result);
    return result;
  }
  const g = gen();

  console.log(g, g.next(1), result, g.next(1), result);
}
