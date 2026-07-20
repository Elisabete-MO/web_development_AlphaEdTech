
class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        if (typeof fn !== "function") {
            throw new TypeError("O observer deve ser uma função.");
        }

        this.observers.push(fn);

        return () => {
            const index = this.observers.indexOf(fn);

            if (index !== -1) {
                this.observers.splice(index, 1);
            }
        };
    }

    notify(data) {
        [...this.observers].forEach((observer) => {
            observer(data);
        });
    }
}

function alertaCongelamento(temperatura) {
    if (typeof temperatura !== "number") {
        console.log("AlertaCongelamento: dado inválido.");
        return;
    }

    if (temperatura < 0) {
        console.log("⚠️ CONGELAMENTO");
    }
}

function alertaCalor(temperatura) {
    if (typeof temperatura !== "number") {
        console.log("AlertaCalor: dado inválido.");
        return;
    }

    if (temperatura > 35) {
        console.log("🔥 CALOR EXTREMO");
    }
}

function logger(temperatura) {
    if (typeof temperatura !== "number") {
        console.log("Logger: dado inválido.");
        return;
    }

    console.log(`🌡️ Temperatura: ${temperatura}°C`);
}

const sensorTemperatura = new Subject();

sensorTemperatura.subscribe(alertaCongelamento);
sensorTemperatura.subscribe(alertaCalor);
const unsubscribeLogger = sensorTemperatura.subscribe(logger);

console.log("\nNotificação: 25°C");
sensorTemperatura.notify(25);

console.log("\nNotificação: -2°C");
sensorTemperatura.notify(-2);

console.log("\nNotificação: 40°C");
sensorTemperatura.notify(40);

console.log("\nRemovendo o Logger...");
unsubscribeLogger();

console.log("\nNotificação: 15°C");
sensorTemperatura.notify(15);


// node temperatura.js