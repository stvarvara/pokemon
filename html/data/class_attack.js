class Attack {
    static all_attacks = {};

    constructor(name) {
        const attack = charged_moves.find(move => move.name === name) || fast_moves.find(move => move.name === name);
        
        if (!attack) {
            console.log("Undefined move: " + name);
            return undefined;
        }

        const {
            critical_chance = 0,
            duration,
            move_id,
            energy_delta,
            power,
            stamina_loss_scaler,
            type
        } = attack;

        this._name = name;
        this._critical_chance = critical_chance;
        this._duration = duration;
        this._move_id = move_id;
        this._energy_delta = energy_delta;
        this._power = power;
        this._stamina_loss_scaler = stamina_loss_scaler;
        this._type = type;
        this._is_charged = !!charged_moves.find(move => move.name === name);

        if (!Attack.all_attacks[name]) {
            Attack.all_attacks[name] = this;
        }
    }


    toString() {
        return this._name;
    }

    get name() { return this._name; }
    get critical_chance() { return this._critical_chance; }
    get duration() { return this._duration; }
    get move_id() { return this._move_id; }
    get energy_delta() { return this._energy_delta; }
    get power() { return this._power; }
    get stamina_loss_scaler() { return this._stamina_loss_scaler; }
    get type() { return this._type; }
    get is_charged() { return this._is_charged; }
    
}
