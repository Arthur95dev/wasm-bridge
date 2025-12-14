#include <emscripten/bind.h>
#include <vector>
#include <cmath>
#include <stdexcept>

using namespace emscripten;

template <typename T>
class Matrix {
public:
    Matrix(size_t r, size_t c) : rows_(r), cols_(c), data_(r * c, 0) {}

    size_t rows() const { return rows_; }
    size_t cols() const { return cols_; }

    T get(size_t r, size_t c) const { return data_[r * cols_ + c]; }
    void set(size_t r, size_t c, T value) { data_[r * cols_ + c] = value; }

    void transpose() {
        std::vector<T> newData(cols_ * rows_);
        for (size_t i = 0; i < rows_; i++) {
            for (size_t j = 0; j < cols_; j++) {
                newData[j * rows_ + i] = data_[i * cols_ + j];
            }
        }
        std::swap(rows_, cols_);
        data_ = std::move(newData);
    }

private:
    size_t rows_, cols_;
    std::vector<T> data_;
};

template <typename T>
T dotProduct(const std::vector<T>& a, const std::vector<T>& b) {
    if (a.size() != b.size()) throw std::runtime_error("Vectors must have same size");
    T sum = 0;
    for (size_t i = 0; i < a.size(); i++) sum += a[i] * b[i];
    return sum;
}

EMSCRIPTEN_BINDINGS(linear_algebra_module) {
    register_vector<float>("VectorFloat");
    register_vector<double>("VectorDouble");

    class_<Matrix<float>>("MatrixFloat")
        .constructor<size_t, size_t>()
        .function("rows", &Matrix<float>::rows)
        .function("cols", &Matrix<float>::cols)
        .function("get", &Matrix<float>::get)
        .function("set", &Matrix<float>::set)
        .function("transpose", &Matrix<float>::transpose);

    class_<Matrix<double>>("MatrixDouble")
        .constructor<size_t, size_t>()
        .function("rows", &Matrix<double>::rows)
        .function("cols", &Matrix<double>::cols)
        .function("get", &Matrix<double>::get)
        .function("set", &Matrix<double>::set)
        .function("transpose", &Matrix<double>::transpose);

    function("dotFloat", &dotProduct<float>);
    function("dotDouble", &dotProduct<double>);
}
