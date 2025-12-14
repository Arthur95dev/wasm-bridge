#include <emscripten/bind.h>
#include <vector>
#include <numeric>
#include <algorithm>
#include <cmath>

using namespace emscripten;

// ---------- Базовые функции ----------
template <typename T>
T sumArray(const std::vector<T>& arr) {
    return std::accumulate(arr.begin(), arr.end(), static_cast<T>(0));
}

template <typename T>
T averageArray(const std::vector<T>& arr) {
    if (arr.empty()) return static_cast<T>(0);
    return sumArray(arr) / static_cast<T>(arr.size());
}

template <typename T>
T minArray(const std::vector<T>& arr) {
    if (arr.empty()) return static_cast<T>(0);
    return *std::min_element(arr.begin(), arr.end());
}

template <typename T>
T maxArray(const std::vector<T>& arr) {
    if (arr.empty()) return static_cast<T>(0);
    return *std::max_element(arr.begin(), arr.end());
}

// ---------- Дополнительные функции ----------
template <typename T>
T medianArray(std::vector<T> arr) {
    if (arr.empty()) return static_cast<T>(0);
    std::sort(arr.begin(), arr.end());
    size_t n = arr.size();
    if (n % 2 == 0) {
        return (arr[n/2 - 1] + arr[n/2]) / static_cast<T>(2);
    } else {
        return arr[n/2];
    }
}

template <typename T>
T stdDevArray(const std::vector<T>& arr) {
    if (arr.empty()) return static_cast<T>(0);
    T mean = averageArray(arr);
    T sumSq = 0;
    for (auto val : arr) {
        sumSq += (val - mean) * (val - mean);
    }
    return std::sqrt(sumSq / static_cast<T>(arr.size()));
}

template <typename T>
T percentileArray(std::vector<T> arr, double p) {
    if (arr.empty()) return static_cast<T>(0);
    std::sort(arr.begin(), arr.end());
    double idx = p * (arr.size() - 1);
    size_t i = static_cast<size_t>(idx);
    double frac = idx - i;
    if (i + 1 < arr.size()) {
        return arr[i] * (1 - frac) + arr[i+1] * frac;
    } else {
        return arr[i];
    }
}

template <typename T>
std::pair<T, T> linearRegression(const std::vector<T>& x, const std::vector<T>& y) {
    size_t n = x.size();
    if (n == 0 || n != y.size()) return {0, 0};

    T sumX = std::accumulate(x.begin(), x.end(), static_cast<T>(0));
    T sumY = std::accumulate(y.begin(), y.end(), static_cast<T>(0));
    T sumXY = 0, sumXX = 0;

    for (size_t i = 0; i < n; i++) {
        sumXY += x[i] * y[i];
        sumXX += x[i] * x[i];
    }

    T slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    T intercept = (sumY - slope * sumX) / n;
    return {slope, intercept};
}

// ---------- Регистрация ----------
EMSCRIPTEN_BINDINGS(advanced_statistics_module) {
    register_vector<int>("VectorInt");
    register_vector<float>("VectorFloat");
    register_vector<double>("VectorDouble");

    // Базовые функции
    function("sumArrayInt", &sumArray<int>);
    function("averageArrayInt", &averageArray<int>);
    function("minArrayInt", &minArray<int>);
    function("maxArrayInt", &maxArray<int>);

    function("sumArrayFloat", &sumArray<float>);
    function("averageArrayFloat", &averageArray<float>);
    function("minArrayFloat", &minArray<float>);
    function("maxArrayFloat", &maxArray<float>);

    function("sumArrayDouble", &sumArray<double>);
    function("averageArrayDouble", &averageArray<double>);
    function("minArrayDouble", &minArray<double>);
    function("maxArrayDouble", &maxArray<double>);

    // Расширенные функции
    function("medianInt", &medianArray<int>);
    function("stdDevFloat", &stdDevArray<float>);
    function("percentileDouble", &percentileArray<double>);
    function("linearRegressionFloat", &linearRegression<float>);
}
