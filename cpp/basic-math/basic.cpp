#include <emscripten/bind.h>
#include <cmath>
using namespace emscripten;

double add(double a, double b) { return a + b; }
double sub(double a, double b) { return a - b; }
double mul(double a, double b) { return a * b; }
double emcc_div(double a, double b) { return b != 0 ? a / b : 0.0; }
double pow2(double a) { return a * a; }
double emcc_sqrt(double a) { return std::sqrt(a); }

EMSCRIPTEN_BINDINGS(math_module) {
  function("add", &add);
  function("sub", &sub);
  function("mul", &mul);
  function("div", &emcc_div);
  function("pow2", &pow2);
  function("sqrt", &emcc_sqrt);
}
