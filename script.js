$(document).ready(function() {
    $('#quadratic-form').on('submit', function(event) {
        event.preventDefault();
        const a = parseFloat($('#a').val());
        const b = parseFloat($('#b').val());
        const c = parseFloat($('#c').val());

        $('#a-error').text("");

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            alert("Por favor, insira números válidos para 'a', 'b' e 'c'.");
            return;
        }
        if (a === 0) {
            $('#a-error').text("O valor de 'a' não pode ser zero, pois não será uma função quadrática.");
            return;
        }

        const solver = new QuadraticEquationSolver(a, b, c);
        const result = solver.findVertex();

        let resultHtml = `<p>A função possui concavidade voltada para ${result.vertexType}.</p>`;
        resultHtml += `<p>' Y ' do Vértice é ${result.vertexY.toFixed(2)}.</p>`;

        $('#results').html(resultHtml);
    });
});

class QuadraticEquationSolver {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    findVertex() {
        const xVertex = -this.b / (2 * this.a);
        const yVertex = this.a * xVertex * xVertex + this.b * xVertex + this.c;
        const vertexType = this.a > 0 ? 'cima é seu valor mínimo do': 'baixo é seu valor máximo do';

        return { vertexType, vertexY: yVertex };
    }
}
