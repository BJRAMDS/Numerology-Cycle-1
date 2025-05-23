// 🧠 Enhanced Event System with Numerology-Compatible Hooks & Symbolic Logging

class AsyncEventEmitter {
  constructor() {
    this._handlers = Object.create(null);
    this._middleware = [];
    this.context = {};
    this.history = [];
  }

  on(event, fn) {
    if (typeof fn !== 'function') throw new TypeError('Handler must be a function');
    (this._handlers[event] ||= []).push({ fn, once: false });
    return this;
  }

  once(event, fn) {
    if (typeof fn !== 'function') throw new TypeError('Handler must be a function');
    (this._handlers[event] ||= []).push({ fn, once: true });
    return this;
  }

  off(event, fn) {
    if (!this._handlers[event]) return this;
    if (!fn) {
      delete this._handlers[event];
    } else {
      this._handlers[event] = this._handlers[event].filter(h => h.fn !== fn);
      if (this._handlers[event].length === 0) delete this._handlers[event];
    }
    return this;
  }

  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be a function');
    this._middleware.push(fn);
    return this;
  }

  async emit(event, ...args) {
    const dateStr = new Date().toISOString().slice(0, 10);
    const numerology = this._calculateNumerology(dateStr);

    for (const mw of this._middleware) {
      args = await mw(...args) || args;
    }

    this.history.push({ event, args, date: dateStr, numerology, timestamp: new Date().toISOString() });

    console.log(`🔔 [Event: ${event} | 🧮 ${numerology} on ${dateStr}]`, ...args);

    const handlers = this._handlers[event];
    if (!handlers) return;

    for (const h of [...handlers]) {
      try {
        await h.fn(...args);
      } catch (err) {
        console.error(`❌ Error in handler for "${event}":`, err);
      }
      if (h.once) this.off(event, h.fn);
    }
  }

  // 🔁 Runtime symbolic loop for Numerology 7 (Reflection)
  async reflect(prompt = "What pattern did we repeat today?") {
    const reflection = {
      timestamp: new Date().toISOString(),
      prompt,
      context: this.context,
      lastEvent: this.history[this.history.length - 1],
    };
    console.log("🪞 Reflecting:", reflection);
    return reflection;
  }

  // 📖 Export log snapshot for journaling
  exportCodexSnapshot() {
    return {
      exportedAt: new Date().toISOString(),
      entries: this.history.map(entry => ({
        date: entry.date,
        numerology: entry.numerology,
        event: entry.event,
        args: entry.args,
        timestamp: entry.timestamp
      }))
    };
  }

  getHistory() {
    return this.history;
  }

  setContext(key, value) {
    this.context[key] = value;
  }

  getContext(key) {
    return this.context[key];
  }

  // 🔢 Calculate numerology from YYYY-MM-DD
  _calculateNumerology(dateStr) {
    const digits = dateStr.replace(/\D/g, "").split("").map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split("").reduce((a, b) => a + Number(b), 0);
    }
    return sum;
  }
}

module.exports = AsyncEventEmitter;
