#include <vector>
#include <algorithm>
#include <emscripten/bind.h>

using namespace emscripten;

// Сортировка по возрастанию
std::vector<int> sortAscending(const std::vector<int>& arr) {
    std::vector<int> result = arr;
    std::sort(result.begin(), result.end());
    return result;
}

// Сортировка по убыванию
std::vector<int> sortDescending(const std::vector<int>& arr) {
    std::vector<int> result = arr;
    std::sort(result.begin(), result.end(), std::greater<int>());
    return result;
}

// Быстрая сортировка (пример — просто вызывает std::sort)
std::vector<int> quickSort(const std::vector<int>& arr) {
    std::vector<int> result = arr;
    std::sort(result.begin(), result.end());
    return result;
}

EMSCRIPTEN_BINDINGS(array_sort_module) {
    register_vector<int>("VectorInt");
    function("sortAscending", &sortAscending);
    function("sortDescending", &sortDescending);
    function("quickSort", &quickSort);
}
