// class Attack
class Attack {
    static all_attacks = {};

    constructor(move_id, name, type, power, duration, energy_delta, stamina_loss_scaler, critical_chance) {
        this._move_id = move_id;
        this._name = name;
        this._type = type;
        this._power = power;
        this._duration = duration;
        this._energy_delta = energy_delta;
        this._stamina_loss_scaler = stamina_loss_scaler;
        this._critical_chance = critical_chance;
    }

    get move_id() {
        return this._move_id;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get power() {
        return this._power;
    }

    get duration() {
        return this._duration;
    }

    get energy_delta() {
        return this._energy_delta;
    }

    get stamina_loss_scaler() {
        return this._stamina_loss_scaler;
    }

    get critical_chance() {
        return this._critical_chance;
    }

    toString() {
        return `${this.name} - Type: ${this.type}, Power: ${this.power}, Duration: ${this.duration}, Energy Delta: ${this.energy_delta}, Stamina Loss Scaler: ${this.stamina_loss_scaler}, Critical Chance: ${this.critical_chance}`;
    }

    static import_attacks() {
        for (let entry of fast_moves) {
            if (!Attack.all_attacks[entry.move_id]) {
                Attack.all_attacks[entry.move_id] = new Attack(
                    entry.move_id,
                    entry.name,
                    entry.type,
                    entry.power,
                    entry.duration,
                    entry.energy_delta,
                    entry.stamina_loss_scaler,
                    null
                );
            }
        }

        for (let entry of charged_moves) {
            if (!Attack.all_attacks[entry.move_id]) {
                Attack.all_attacks[entry.move_id] = new Attack(
                    entry.move_id,
                    entry.name,
                    entry.type,
                    entry.power,
                    entry.duration,
                    entry.energy_delta,
                    entry.stamina_loss_scaler,
                    entry.critical_chance || null
                );
            }
        }
    }

    static getAttackById(move_id) {
        return Attack.all_attacks[move_id];
    }
}
