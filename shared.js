(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'flutterlight:shared'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'flutterlight:shared'.");
    }
    globalThis['flutterlight:shared'] = factory(typeof globalThis['flutterlight:shared'] === 'undefined' ? {} : globalThis['flutterlight:shared'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var log10 = Math.log10;
  var protoOf = kotlin_kotlin.$_$.q;
  var initMetadataForObject = kotlin_kotlin.$_$.o;
  var VOID = kotlin_kotlin.$_$.a;
  var getStringHashCode = kotlin_kotlin.$_$.m;
  var getNumberHashCode = kotlin_kotlin.$_$.l;
  var THROW_CCE = kotlin_kotlin.$_$.y;
  var equals = kotlin_kotlin.$_$.k;
  var initMetadataForClass = kotlin_kotlin.$_$.n;
  var numberToInt = kotlin_kotlin.$_$.p;
  var Unit_instance = kotlin_kotlin.$_$.g;
  var StringBuilder = kotlin_kotlin.$_$.s;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.e;
  var startsWith = kotlin_kotlin.$_$.u;
  var split = kotlin_kotlin.$_$.t;
  var toDouble = kotlin_kotlin.$_$.v;
  var toInt = kotlin_kotlin.$_$.w;
  var Exception = kotlin_kotlin.$_$.x;
  var roundToInt = kotlin_kotlin.$_$.r;
  var isInfinite = kotlin_kotlin.$_$.z;
  var isNaN_0 = kotlin_kotlin.$_$.a1;
  var listOf = kotlin_kotlin.$_$.i;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.c;
  var Default_getInstance = kotlin_kotlin.$_$.f;
  var arrayCopy = kotlin_kotlin.$_$.h;
  var to = kotlin_kotlin.$_$.b1;
  var mapOf = kotlin_kotlin.$_$.j;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.d;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.b;
  //endregion
  //region block: pre-declaration
  initMetadataForObject(Bal, 'Bal');
  initMetadataForClass(Shape, 'Shape');
  initMetadataForClass(GameState, 'GameState', GameState);
  initMetadataForObject(Eng, 'Eng');
  initMetadataForObject(Blend, 'Blend');
  initMetadataForClass(Cam, 'Cam');
  initMetadataForObject(Engine, 'Engine');
  initMetadataForClass(BandRow, 'BandRow');
  initMetadataForClass(ShopRow, 'ShopRow');
  //endregion
  function get_SHAPES() {
    _init_properties_logic_kt__ty2k8k();
    return SHAPES;
  }
  var SHAPES;
  function get_SUF() {
    _init_properties_logic_kt__ty2k8k();
    return SUF;
  }
  var SUF;
  function Bal() {
    Bal_instance = this;
    this.i6_1 = 10;
    this.j6_1 = 1.0;
    this.k6_1 = 10.0;
    this.l6_1 = 1.11;
    this.m6_1 = 50.0;
    this.n6_1 = 2.2;
    this.o6_1 = 1.25;
    this.p6_1 = 400.0;
    this.q6_1 = 2.5;
    this.r6_1 = 1.1;
    this.s6_1 = 5;
    this.t6_1 = 10000.0;
    this.u6_1 = 30000.0;
    this.v6_1 = 1.55;
    this.w6_1 = 0.4;
    this.x6_1 = 5;
    this.y6_1 = 1.25;
    this.z6_1 = 60;
    this.a7_1 = 5;
    this.b7_1 = 20;
    this.c7_1 = 25;
    var tmp = this;
    // Inline function 'kotlin.intArrayOf' call
    tmp.d7_1 = new Int32Array([10, 30, 90, 270]);
    var tmp_0 = this;
    // Inline function 'kotlin.doubleArrayOf' call
    tmp_0.e7_1 = new Float64Array([2.0, 8.0, 24.0, Infinity]);
    this.f7_1 = 0.5;
    this.g7_1 = 25;
    this.h7_1 = 75;
    this.i7_1 = 225;
    var tmp_1 = this;
    // Inline function 'kotlin.intArrayOf' call
    tmp_1.j7_1 = new Int32Array([50, 150, 450]);
    this.k7_1 = 0.02;
    var tmp_2 = this;
    // Inline function 'kotlin.doubleArrayOf' call
    tmp_2.l7_1 = new Float64Array([1.0, 3.0, 10.0]);
    this.m7_1 = 6000;
    this.n7_1 = 300;
  }
  var Bal_instance;
  function Bal_getInstance() {
    if (Bal_instance == null)
      new Bal();
    return Bal_instance;
  }
  function Shape(key, name, sub, mult, reqMult) {
    reqMult = reqMult === VOID ? 1.0 : reqMult;
    this.o7_1 = key;
    this.p7_1 = name;
    this.q7_1 = sub;
    this.r7_1 = mult;
    this.s7_1 = reqMult;
  }
  protoOf(Shape).toString = function () {
    return 'Shape(key=' + this.o7_1 + ', name=' + this.p7_1 + ', sub=' + this.q7_1 + ', mult=' + this.r7_1 + ', reqMult=' + this.s7_1 + ')';
  };
  protoOf(Shape).hashCode = function () {
    var result = getStringHashCode(this.o7_1);
    result = imul(result, 31) + getStringHashCode(this.p7_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.q7_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.r7_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.s7_1) | 0;
    return result;
  };
  protoOf(Shape).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Shape))
      return false;
    var tmp0_other_with_cast = other instanceof Shape ? other : THROW_CCE();
    if (!(this.o7_1 === tmp0_other_with_cast.o7_1))
      return false;
    if (!(this.p7_1 === tmp0_other_with_cast.p7_1))
      return false;
    if (!(this.q7_1 === tmp0_other_with_cast.q7_1))
      return false;
    if (!equals(this.r7_1, tmp0_other_with_cast.r7_1))
      return false;
    if (!equals(this.s7_1, tmp0_other_with_cast.s7_1))
      return false;
    return true;
  };
  function GameState() {
    this.t7_1 = 0.0;
    this.u7_1 = 0.0;
    this.v7_1 = 0.0;
    this.w7_1 = 10;
    this.x7_1 = 0;
    this.y7_1 = new Int32Array(7);
    this.z7_1 = 0;
    this.a8_1 = 0;
    this.b8_1 = 0;
    this.c8_1 = 0;
    this.d8_1 = 0;
    this.e8_1 = 0;
    this.f8_1 = false;
    this.g8_1 = false;
    this.h8_1 = false;
    this.i8_1 = 0.0;
    this.j8_1 = 0.0;
    this.k8_1 = 0.0;
    this.l8_1 = 0.0;
    this.m8_1 = 0;
  }
  function particleCost(P) {
    _init_properties_logic_kt__ty2k8k();
    // Inline function 'kotlin.math.pow' call
    return 10.0 * Math.pow(1.11, P);
  }
  function lightCost(L) {
    _init_properties_logic_kt__ty2k8k();
    // Inline function 'kotlin.math.pow' call
    return 50.0 * Math.pow(2.2, L);
  }
  function bandCost(b, l) {
    _init_properties_logic_kt__ty2k8k();
    // Inline function 'kotlin.math.pow' call
    var tmp = 400.0 * Math.pow(10.0, b);
    // Inline function 'kotlin.math.pow' call
    return tmp * Math.pow(2.5, l);
  }
  function bulkParticleCost(P, n) {
    _init_properties_logic_kt__ty2k8k();
    var r = 1.11;
    // Inline function 'kotlin.math.pow' call
    var tmp = 10.0 * Math.pow(r, P);
    // Inline function 'kotlin.math.pow' call
    return tmp * (Math.pow(r, n) - 1.0) / (r - 1.0);
  }
  function bulkLightCost(L, n) {
    _init_properties_logic_kt__ty2k8k();
    var r = 2.2;
    // Inline function 'kotlin.math.pow' call
    var tmp = 50.0 * Math.pow(r, L);
    // Inline function 'kotlin.math.pow' call
    return tmp * (Math.pow(r, n) - 1.0) / (r - 1.0);
  }
  function maxParticlesAfford(P, light) {
    _init_properties_logic_kt__ty2k8k();
    var r = 1.11;
    var b = 10.0;
    var tmp = light * (r - 1.0);
    // Inline function 'kotlin.math.pow' call
    var c = tmp / (b * Math.pow(r, P)) + 1.0;
    if (c <= 1.0)
      return 0;
    // Inline function 'kotlin.math.log10' call
    var tmp_0 = log10(c);
    // Inline function 'kotlin.math.log10' call
    var tmp$ret$2 = log10(r);
    var n = numberToInt(tmp_0 / tmp$ret$2);
    if (n > (6000 - P | 0))
      n = 6000 - P | 0;
    if (n < 0)
      n = 0;
    while (n > 0 && bulkParticleCost(P, n) > light) {
      n = n - 1 | 0;
    }
    while ((n + 1 | 0) <= (6000 - P | 0) && bulkParticleCost(P, n + 1 | 0) <= light) {
      n = n + 1 | 0;
    }
    return n;
  }
  function maxLightAfford(L, light) {
    _init_properties_logic_kt__ty2k8k();
    var r = 2.2;
    var b = 50.0;
    var tmp = light * (r - 1.0);
    // Inline function 'kotlin.math.pow' call
    var c = tmp / (b * Math.pow(r, L)) + 1.0;
    if (c <= 1.0)
      return 0;
    // Inline function 'kotlin.math.log10' call
    var tmp_0 = log10(c);
    // Inline function 'kotlin.math.log10' call
    var tmp$ret$2 = log10(r);
    var n = numberToInt(tmp_0 / tmp$ret$2);
    if (n > (300 - L | 0))
      n = 300 - L | 0;
    if (n < 0)
      n = 0;
    while (n > 0 && bulkLightCost(L, n) > light) {
      n = n - 1 | 0;
    }
    while ((n + 1 | 0) <= (300 - L | 0) && bulkLightCost(L, n + 1 | 0) <= light) {
      n = n + 1 | 0;
    }
    return n;
  }
  function shapeMult(shapesOwned) {
    _init_properties_logic_kt__ty2k8k();
    var m = 1.0;
    var inductionVariable = 1;
    if (inductionVariable <= shapesOwned)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        m = m * get_SHAPES().i(k).r7_1;
      }
       while (!(k === shapesOwned));
    return m;
  }
  function spectrumMult(bands) {
    _init_properties_logic_kt__ty2k8k();
    var s = 0;
    var inductionVariable = 0;
    var last = bands.length;
    while (inductionVariable < last) {
      var b = bands[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      s = s + b | 0;
    }
    // Inline function 'kotlin.math.pow' call
    var n = s;
    return Math.pow(1.1, n);
  }
  function prismMult(refLvl) {
    _init_properties_logic_kt__ty2k8k();
    // Inline function 'kotlin.math.pow' call
    return Math.pow(1.25, refLvl);
  }
  function momentumMult(S, tNow) {
    _init_properties_logic_kt__ty2k8k();
    if (S.e8_1 <= 0)
      return 1.0;
    var mins = (tNow - S.j8_1) / 60.0;
    var cap = Bal_getInstance().l7_1[S.e8_1 - 1 | 0];
    return 1.0 + 0.02 * (mins < cap ? mins : cap);
  }
  function incomeOf(S, tNow) {
    _init_properties_logic_kt__ty2k8k();
    var tmp = S.w7_1 * 1.0;
    // Inline function 'kotlin.math.pow' call
    var n = S.x7_1;
    return tmp * Math.pow(1.25, n) * shapeMult(S.z7_1) * spectrumMult(S.y7_1) * prismMult(S.b8_1) * momentumMult(S, tNow);
  }
  function reqFor(S) {
    _init_properties_logic_kt__ty2k8k();
    var last = get_SHAPES().h() - 1 | 0;
    var nextK = S.z7_1 >= last ? last : S.z7_1 + 1 | 0;
    var tmp;
    if (S.z7_1 >= last) {
      var over = (S.z7_1 - last | 0) + 1 | 0;
      // Inline function 'kotlin.math.pow' call
      var this_0 = shapeMult(last);
      var tmp_0 = 30000.0 * Math.pow(this_0, 1.55);
      // Inline function 'kotlin.math.pow' call
      tmp = tmp_0 * Math.pow(10.0, over);
    } else {
      // Inline function 'kotlin.math.pow' call
      var this_1 = shapeMult(S.z7_1);
      tmp = 30000.0 * Math.pow(this_1, 1.55);
    }
    var base = tmp;
    // Inline function 'kotlin.math.pow' call
    var this_2 = prismMult(S.b8_1);
    return base * Math.pow(this_2, 0.4) * get_SHAPES().i(nextK).s7_1;
  }
  function intCubeRoot(v) {
    _init_properties_logic_kt__ty2k8k();
    if (v < 1.0)
      return 0;
    // Inline function 'kotlin.math.pow' call
    var x = 1.0 / 3.0;
    var tmp$ret$0 = Math.pow(v, x);
    var k = numberToInt(tmp$ret$0);
    if (k < 1)
      k = 1;
    if (k > 2000000000)
      k = 2000000000;
    while (k > 1 && k * k * k > v) {
      k = k - 1 | 0;
    }
    while (k < 2000000000 && (k + 1 | 0) * (k + 1 | 0) * (k + 1 | 0) <= v) {
      k = k + 1 | 0;
    }
    return k;
  }
  function prismsFor(runEarned) {
    _init_properties_logic_kt__ty2k8k();
    return intCubeRoot(runEarned / 10000.0);
  }
  function buyParticles(S, n) {
    _init_properties_logic_kt__ty2k8k();
    var want = n;
    var room = 6000 - S.w7_1 | 0;
    if (want > room)
      want = room;
    if (want <= 0)
      return 0;
    var c = bulkParticleCost(S.w7_1, want);
    if (S.t7_1 < c) {
      want = maxParticlesAfford(S.w7_1, S.t7_1);
      if (want <= 0)
        return 0;
      c = bulkParticleCost(S.w7_1, want);
    }
    S.t7_1 = S.t7_1 - c;
    S.w7_1 = S.w7_1 + want | 0;
    return want;
  }
  function buyLight(S, n) {
    _init_properties_logic_kt__ty2k8k();
    var want = n;
    var room = 300 - S.x7_1 | 0;
    if (want > room)
      want = room;
    if (want <= 0)
      return 0;
    var c = bulkLightCost(S.x7_1, want);
    if (S.t7_1 < c) {
      want = maxLightAfford(S.x7_1, S.t7_1);
      if (want <= 0)
        return 0;
      c = bulkLightCost(S.x7_1, want);
    }
    S.t7_1 = S.t7_1 - c;
    S.x7_1 = S.x7_1 + want | 0;
    return want;
  }
  function buyBand(S, b) {
    _init_properties_logic_kt__ty2k8k();
    var l = S.y7_1[b];
    if (l >= 5)
      return 0;
    var c = bandCost(b, l);
    if (S.t7_1 < c)
      return 0;
    S.t7_1 = S.t7_1 - c;
    S.y7_1[b] = l + 1 | 0;
    if (S.y7_1[b] === 5) {
      if (S.x7_1 < 300) {
        S.x7_1 = S.x7_1 + 1 | 0;
      }
      return 2;
    }
    return 1;
  }
  function canGather(S) {
    _init_properties_logic_kt__ty2k8k();
    return S.u7_1 >= reqFor(S);
  }
  function doGather(S) {
    _init_properties_logic_kt__ty2k8k();
    if (!canGather(S))
      return -1;
    var gained = prismsFor(S.u7_1);
    S.a8_1 = S.a8_1 > (2000000000 - gained | 0) ? 2000000000 : S.a8_1 + gained | 0;
    var wasComplete = S.z7_1 >= (get_SHAPES().h() - 1 | 0);
    if (!wasComplete) {
      S.z7_1 = S.z7_1 + 1 | 0;
    }
    S.m8_1 = S.m8_1 + 1 | 0;
    S.t7_1 = 0.0;
    S.u7_1 = 0.0;
    S.w7_1 = 10 + imul(25, S.c8_1) | 0;
    S.x7_1 = 0;
    var inductionVariable = 0;
    var last = S.y7_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        S.y7_1[i] = 0;
      }
       while (inductionVariable <= last);
    S.j8_1 = S.i8_1;
    return gained;
  }
  function shopCost(kind, lvl) {
    _init_properties_logic_kt__ty2k8k();
    var tmp;
    switch (kind) {
      case 'ref':
        var tmp_0;
        if (lvl >= 60) {
          tmp_0 = -1.0;
        } else {
          // Inline function 'kotlin.math.pow' call
          tmp_0 = 5 * Math.pow(2.0, lvl);
        }

        tmp = tmp_0;
        break;
      case 'head':
        var tmp_1;
        if (lvl >= 20) {
          tmp_1 = -1.0;
        } else {
          // Inline function 'kotlin.math.pow' call
          tmp_1 = 5 * Math.pow(2.0, lvl);
        }

        tmp = tmp_1;
        break;
      case 'after':
        tmp = lvl >= Bal_getInstance().d7_1.length ? -1.0 : Bal_getInstance().d7_1[lvl];
        break;
      case 'mom':
        tmp = lvl >= Bal_getInstance().j7_1.length ? -1.0 : Bal_getInstance().j7_1[lvl];
        break;
      default:
        tmp = -1.0;
        break;
    }
    return tmp;
  }
  function buyShop(S, kind) {
    _init_properties_logic_kt__ty2k8k();
    var tmp;
    switch (kind) {
      case 'ref':
        tmp = S.b8_1;
        break;
      case 'head':
        tmp = S.c8_1;
        break;
      case 'after':
        tmp = S.d8_1;
        break;
      case 'mom':
        tmp = S.e8_1;
        break;
      default:
        return false;
    }
    var lvl = tmp;
    var c = shopCost(kind, lvl);
    if (c < 0.0 || S.a8_1 < c)
      return false;
    S.a8_1 = S.a8_1 - numberToInt(c) | 0;
    switch (kind) {
      case 'ref':
        S.b8_1 = S.b8_1 + 1 | 0;
        break;
      case 'head':
        S.c8_1 = S.c8_1 + 1 | 0;
        break;
      case 'after':
        S.d8_1 = S.d8_1 + 1 | 0;
        break;
      case 'mom':
        S.e8_1 = S.e8_1 + 1 | 0;
        break;
    }
    return true;
  }
  function buyAuto(S, kind) {
    _init_properties_logic_kt__ty2k8k();
    var tmp;
    switch (kind) {
      case 'autoP':
        tmp = 25;
        break;
      case 'autoL':
        tmp = 75;
        break;
      case 'autoS':
        tmp = 225;
        break;
      default:
        return false;
    }
    var c = tmp;
    var tmp_0;
    switch (kind) {
      case 'autoP':
        tmp_0 = S.f8_1;
        break;
      case 'autoL':
        tmp_0 = S.g8_1;
        break;
      case 'autoS':
        tmp_0 = S.h8_1;
        break;
      default:
        return false;
    }
    var owned = tmp_0;
    if (owned || S.a8_1 < c)
      return false;
    S.a8_1 = S.a8_1 - c | 0;
    switch (kind) {
      case 'autoP':
        S.f8_1 = true;
        break;
      case 'autoL':
        S.g8_1 = true;
        break;
      case 'autoS':
        S.h8_1 = true;
        break;
    }
    return true;
  }
  function pureTick(S, dt) {
    _init_properties_logic_kt__ty2k8k();
    S.i8_1 = S.i8_1 + dt;
    var inc = incomeOf(S, S.i8_1);
    S.t7_1 = S.t7_1 + inc * dt;
    S.u7_1 = S.u7_1 + inc * dt;
    S.v7_1 = S.v7_1 + inc * dt;
    if (S.f8_1) {
      var g = 0;
      $l$loop: while (g < 200 && S.w7_1 < 6000 && particleCost(S.w7_1) <= inc * 15.0 && buyParticles(S, 1) !== 0) {
        g = g + 1 | 0;
      }
    }
    if (S.g8_1) {
      var g_0 = 0;
      $l$loop_0: while (g_0 < 200 && S.x7_1 < 300 && lightCost(S.x7_1) <= inc * 30.0 && buyLight(S, 1) !== 0) {
        g_0 = g_0 + 1 | 0;
      }
    }
    if (S.h8_1) {
      var g_1 = 0;
      $l$loop_3: while (g_1 < 60) {
        var bb = -1;
        var bc = 1.7976931348623157E308;
        var inductionVariable = 0;
        if (inductionVariable <= 6)
          $l$loop_1: do {
            var b = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var l = S.y7_1[b];
            if (l >= 5)
              continue $l$loop_1;
            var c = bandCost(b, l);
            if (c < bc) {
              bc = c;
              bb = b;
            }
          }
           while (inductionVariable <= 6);
        if (bb < 0 || bc > inc * 60.0)
          break $l$loop_3;
        if (buyBand(S, bb) === 0)
          break $l$loop_3;
        g_1 = g_1 + 1 | 0;
      }
    }
  }
  function serialize(S) {
    _init_properties_logic_kt__ty2k8k();
    var sb = new StringBuilder('v1');
    sb.i4(_Char___init__impl__6a9atx(124)).n4(S.t7_1).i4(_Char___init__impl__6a9atx(124)).n4(S.u7_1).i4(_Char___init__impl__6a9atx(124)).n4(S.v7_1);
    sb.i4(_Char___init__impl__6a9atx(124)).m4(S.w7_1).i4(_Char___init__impl__6a9atx(124)).m4(S.x7_1).i4(_Char___init__impl__6a9atx(124));
    var inductionVariable = 0;
    if (inductionVariable <= 6)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        sb.m4(S.y7_1[i]);
        if (i < 6) {
          sb.i4(_Char___init__impl__6a9atx(44));
        }
      }
       while (inductionVariable <= 6);
    sb.i4(_Char___init__impl__6a9atx(124)).m4(S.z7_1).i4(_Char___init__impl__6a9atx(124)).m4(S.a8_1).i4(_Char___init__impl__6a9atx(124)).m4(S.b8_1);
    sb.i4(_Char___init__impl__6a9atx(124)).m4(S.c8_1).i4(_Char___init__impl__6a9atx(124)).m4(S.d8_1).i4(_Char___init__impl__6a9atx(124)).m4(S.e8_1);
    sb.i4(_Char___init__impl__6a9atx(124)).m4(S.f8_1 ? 1 : 0).i4(_Char___init__impl__6a9atx(124)).m4(S.g8_1 ? 1 : 0);
    sb.i4(_Char___init__impl__6a9atx(124)).m4(S.h8_1 ? 1 : 0);
    sb.i4(_Char___init__impl__6a9atx(124)).n4(S.i8_1).i4(_Char___init__impl__6a9atx(124)).n4(S.j8_1).i4(_Char___init__impl__6a9atx(124)).n4(S.k8_1);
    sb.i4(_Char___init__impl__6a9atx(124)).n4(S.l8_1).i4(_Char___init__impl__6a9atx(124)).m4(S.m8_1);
    return sb.toString();
  }
  function deserialize(raw) {
    _init_properties_logic_kt__ty2k8k();
    if (!startsWith(raw, 'v1|'))
      return null;
    var f = split(raw, ['|']);
    if (f.h() < 21)
      return null;
    var tmp;
    try {
      var S = new GameState();
      S.t7_1 = toDouble(f.i(1));
      S.u7_1 = toDouble(f.i(2));
      S.v7_1 = toDouble(f.i(3));
      S.w7_1 = toInt(f.i(4));
      S.x7_1 = toInt(f.i(5));
      var bs = split(f.i(6), [',']);
      var inductionVariable = 0;
      if (inductionVariable <= 6)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          S.y7_1[i] = i < bs.h() ? toInt(bs.i(i)) : 0;
        }
         while (inductionVariable <= 6);
      S.z7_1 = toInt(f.i(7));
      S.a8_1 = toInt(f.i(8));
      S.b8_1 = toInt(f.i(9));
      S.c8_1 = toInt(f.i(10));
      S.d8_1 = toInt(f.i(11));
      S.e8_1 = toInt(f.i(12));
      S.f8_1 = f.i(13) === '1';
      S.g8_1 = f.i(14) === '1';
      S.h8_1 = f.i(15) === '1';
      S.i8_1 = toDouble(f.i(16));
      S.j8_1 = toDouble(f.i(17));
      S.k8_1 = toDouble(f.i(18));
      S.l8_1 = toDouble(f.i(19));
      S.m8_1 = toInt(f.i(20));
      tmp = S;
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Exception) {
        var e = $p;
        tmp_0 = null;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function trim1(x) {
    _init_properties_logic_kt__ty2k8k();
    var t = roundToInt(x * 10.0);
    return (t / 10 | 0).toString() + '.' + (t % 10 | 0).toString();
  }
  function trim2(x) {
    _init_properties_logic_kt__ty2k8k();
    var t = roundToInt(x * 100.0);
    return (t / 100 | 0).toString() + '.' + ((t % 100 | 0) / 10 | 0).toString() + (t % 10 | 0).toString();
  }
  function fmt(n) {
    _init_properties_logic_kt__ty2k8k();
    if (isInfinite(n))
      return '\u221E';
    if (isNaN_0(n))
      return '?';
    if (n < 0)
      return '-' + fmt(-n);
    if (n < 1000) {
      var tmp;
      if (n < 10) {
        // Inline function 'kotlin.math.floor' call
        tmp = !(n === Math.floor(n));
      } else {
        tmp = false;
      }
      if (tmp)
        return trim1(n);
      return numberToInt(n).toString();
    }
    // Inline function 'kotlin.math.log10' call
    var tmp$ret$1 = log10(n);
    var e = numberToInt(tmp$ret$1 / 3.0);
    if (e >= get_SUF().h()) {
      // Inline function 'kotlin.math.log10' call
      var tmp$ret$2 = log10(n);
      var ex = numberToInt(tmp$ret$2);
      // Inline function 'kotlin.math.pow' call
      var m = n / Math.pow(10.0, ex);
      return trim2(m) + 'e' + ex;
    }
    // Inline function 'kotlin.math.pow' call
    var m_0 = n / Math.pow(1000.0, e);
    return m_0 >= 100.0 ? numberToInt(m_0).toString() + get_SUF().i(e) : m_0 >= 10.0 ? trim1(m_0) + get_SUF().i(e) : trim2(m_0) + get_SUF().i(e);
  }
  function fmtMult(n) {
    _init_properties_logic_kt__ty2k8k();
    return n < 10.0 ? '\xD7' + trim2(n) : n < 1000.0 ? '\xD7' + trim1(n) : '\xD7' + fmt(n);
  }
  var properties_initialized_logic_kt_gv5mr2;
  function _init_properties_logic_kt__ty2k8k() {
    if (!properties_initialized_logic_kt_gv5mr2) {
      properties_initialized_logic_kt_gv5mr2 = true;
      SHAPES = listOf([new Shape('sphere', 'FORMLESS SPHERE', 'zero corners \xB7 pure potential', 1.0), new Shape('tri', 'TRIANGLE', '3 corners \xB7 STABILITY', 3.0), new Shape('square', 'SQUARE', '4 corners \xB7 FOUNDATION', 5.0), new Shape('pent', 'PENTAGON', '5 corners \xB7 the golden ratio lives here', 8.0, 1.0), new Shape('hex', 'HEXAGON', "6 corners \xB7 nature's lattice", 13.0, 2.0), new Shape('star', 'STAR', '10 corners \xB7 RADIANCE', 25.0, 4.0), new Shape('heart', 'HEART', 'abstract: the cusp \xB7 PULSE', 50.0, 8.0), new Shape('galaxy', 'SPIRAL GALAXY', 'abstract: angular momentum', 120.0, 12.0), new Shape('mobius', 'M\xD6BIUS BAND', 'abstract: one side \xB7 offline gains \xD72', 350.0, 16.0), new Shape('klein', 'KLEIN BOTTLE', 'abstract: contained infinity', 1000.0, 24.0), new Shape('knot', 'TORUS KNOT', 'abstract: knottedness \xB7 BINDING', 4000.0, 32.0), new Shape('tesseract', 'TESSERACT', 'abstract: the fourth dimension', 20000.0, 48.0)]);
      SUF = listOf(['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc', 'NoDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QaVg']);
    }
  }
  function get_TAU() {
    _init_properties_web_kt__le8mgy();
    return TAU;
  }
  var TAU;
  function set_S(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    S = _set____db54di;
  }
  function get_S() {
    _init_properties_web_kt__le8mgy();
    return S;
  }
  var S;
  function get_BANDNAMES() {
    _init_properties_web_kt__le8mgy();
    return BANDNAMES;
  }
  var BANDNAMES;
  function get_BANDHUES() {
    _init_properties_web_kt__le8mgy();
    return BANDHUES;
  }
  var BANDHUES;
  function get_VSH() {
    _init_properties_web_kt__le8mgy();
    return VSH;
  }
  var VSH;
  function get_FSH() {
    _init_properties_web_kt__le8mgy();
    return FSH;
  }
  var FSH;
  function set_canvas(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    canvas = _set____db54di;
  }
  function get_canvas() {
    _init_properties_web_kt__le8mgy();
    return canvas;
  }
  var canvas;
  function set_gl(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    gl = _set____db54di;
  }
  function get_gl() {
    _init_properties_web_kt__le8mgy();
    return gl;
  }
  var gl;
  function set_posBuf(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    posBuf = _set____db54di;
  }
  function get_posBuf() {
    _init_properties_web_kt__le8mgy();
    return posBuf;
  }
  var posBuf;
  function set_seedBuf(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    seedBuf = _set____db54di;
  }
  function get_seedBuf() {
    _init_properties_web_kt__le8mgy();
    return seedBuf;
  }
  var seedBuf;
  function set_starBuf(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    starBuf = _set____db54di;
  }
  function get_starBuf() {
    _init_properties_web_kt__le8mgy();
    return starBuf;
  }
  var starBuf;
  function set_starSeedBuf(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    starSeedBuf = _set____db54di;
  }
  function get_starSeedBuf() {
    _init_properties_web_kt__le8mgy();
    return starSeedBuf;
  }
  var starSeedBuf;
  function set_posF32(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    posF32 = _set____db54di;
  }
  function get_posF32() {
    _init_properties_web_kt__le8mgy();
    return posF32;
  }
  var posF32;
  function set_seedF32(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    seedF32 = _set____db54di;
  }
  function get_seedF32() {
    _init_properties_web_kt__le8mgy();
    return seedF32;
  }
  var seedF32;
  function set_starF32(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    starF32 = _set____db54di;
  }
  function get_starF32() {
    _init_properties_web_kt__le8mgy();
    return starF32;
  }
  var starF32;
  function set_starSeedF32(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    starSeedF32 = _set____db54di;
  }
  function get_starSeedF32() {
    _init_properties_web_kt__le8mgy();
    return starSeedF32;
  }
  var starSeedF32;
  function set_projF32(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    projF32 = _set____db54di;
  }
  function get_projF32() {
    _init_properties_web_kt__le8mgy();
    return projF32;
  }
  var projF32;
  function set_APOS(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    APOS = _set____db54di;
  }
  function get_APOS() {
    _init_properties_web_kt__le8mgy();
    return APOS;
  }
  var APOS;
  function set_ASEED(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    ASEED = _set____db54di;
  }
  function get_ASEED() {
    _init_properties_web_kt__le8mgy();
    return ASEED;
  }
  var ASEED;
  function set_uProj(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uProj = _set____db54di;
  }
  function get_uProj() {
    _init_properties_web_kt__le8mgy();
    return uProj;
  }
  var uProj;
  function set_uAz(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uAz = _set____db54di;
  }
  function get_uAz() {
    _init_properties_web_kt__le8mgy();
    return uAz;
  }
  var uAz;
  function set_uEl(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uEl = _set____db54di;
  }
  function get_uEl() {
    _init_properties_web_kt__le8mgy();
    return uEl;
  }
  var uEl;
  function set_uDist(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uDist = _set____db54di;
  }
  function get_uDist() {
    _init_properties_web_kt__le8mgy();
    return uDist;
  }
  var uDist;
  function set_uTime(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uTime = _set____db54di;
  }
  function get_uTime() {
    _init_properties_web_kt__le8mgy();
    return uTime;
  }
  var uTime;
  function set_uHue(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uHue = _set____db54di;
  }
  function get_uHue() {
    _init_properties_web_kt__le8mgy();
    return uHue;
  }
  var uHue;
  function set_uSat(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uSat = _set____db54di;
  }
  function get_uSat() {
    _init_properties_web_kt__le8mgy();
    return uSat;
  }
  var uSat;
  function set_uLight(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uLight = _set____db54di;
  }
  function get_uLight() {
    _init_properties_web_kt__le8mgy();
    return uLight;
  }
  var uLight;
  function set_uBright(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uBright = _set____db54di;
  }
  function get_uBright() {
    _init_properties_web_kt__le8mgy();
    return uBright;
  }
  var uBright;
  function set_uSize(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uSize = _set____db54di;
  }
  function get_uSize() {
    _init_properties_web_kt__le8mgy();
    return uSize;
  }
  var uSize;
  function set_uScale(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uScale = _set____db54di;
  }
  function get_uScale() {
    _init_properties_web_kt__le8mgy();
    return uScale;
  }
  var uScale;
  function set_distFactor(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    distFactor = _set____db54di;
  }
  function get_distFactor() {
    _init_properties_web_kt__le8mgy();
    return distFactor;
  }
  var distFactor;
  function set_Wc(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    Wc = _set____db54di;
  }
  function get_Wc() {
    _init_properties_web_kt__le8mgy();
    return Wc;
  }
  var Wc;
  function set_Hc(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    Hc = _set____db54di;
  }
  function get_Hc() {
    _init_properties_web_kt__le8mgy();
    return Hc;
  }
  var Hc;
  function get_bandRows() {
    _init_properties_web_kt__le8mgy();
    return bandRows;
  }
  var bandRows;
  function get_shopRows() {
    _init_properties_web_kt__le8mgy();
    return shopRows;
  }
  var shopRows;
  function set_curTab(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    curTab = _set____db54di;
  }
  function get_curTab() {
    _init_properties_web_kt__le8mgy();
    return curTab;
  }
  var curTab;
  function set_acc(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    acc = _set____db54di;
  }
  function get_acc() {
    _init_properties_web_kt__le8mgy();
    return acc;
  }
  var acc;
  function set_uiAcc(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    uiAcc = _set____db54di;
  }
  function get_uiAcc() {
    _init_properties_web_kt__le8mgy();
    return uiAcc;
  }
  var uiAcc;
  function set_lastNow(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    lastNow = _set____db54di;
  }
  function get_lastNow() {
    _init_properties_web_kt__le8mgy();
    return lastNow;
  }
  var lastNow;
  function set_rafStarted(_set____db54di) {
    _init_properties_web_kt__le8mgy();
    rafStarted = _set____db54di;
  }
  function get_rafStarted() {
    _init_properties_web_kt__le8mgy();
    return rafStarted;
  }
  var rafStarted;
  function win() {
    _init_properties_web_kt__le8mgy();
    return window;
  }
  function doc() {
    _init_properties_web_kt__le8mgy();
    return document;
  }
  function store() {
    _init_properties_web_kt__le8mgy();
    return localStorage;
  }
  function mkf32(n) {
    _init_properties_web_kt__le8mgy();
    var w = window;
    return w.__mk(n);
  }
  function E(id) {
    _init_properties_web_kt__le8mgy();
    return doc().getElementById(id);
  }
  function poly($this, n, R) {
    var tmp = 0;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_0 = Array(n);
    while (tmp < n) {
      tmp_0[tmp] = new Float64Array(2);
      tmp = tmp + 1 | 0;
    }
    var p = tmp_0;
    var inductionVariable = 0;
    if (inductionVariable < n)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var a = -3.141592653589793 / 2 + k * get_TAU() / n;
        var tmp_1 = p[k];
        // Inline function 'kotlin.math.cos' call
        tmp_1[0] = Math.cos(a) * R;
        var tmp_2 = p[k];
        // Inline function 'kotlin.math.sin' call
        tmp_2[1] = Math.sin(a) * R;
      }
       while (inductionVariable < n);
    return p;
  }
  function starPts($this) {
    var tmp = 0;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_0 = Array(10);
    while (tmp < 10) {
      tmp_0[tmp] = new Float64Array(2);
      tmp = tmp + 1 | 0;
    }
    var p = tmp_0;
    var inductionVariable = 0;
    if (inductionVariable < 10)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var a = -3.141592653589793 / 2 + k * 3.141592653589793 / 5;
        var r = (k % 2 | 0) === 1 ? 0.66 : 1.7;
        var tmp_1 = p[k];
        // Inline function 'kotlin.math.cos' call
        tmp_1[0] = Math.cos(a) * r;
        var tmp_2 = p[k];
        // Inline function 'kotlin.math.sin' call
        tmp_2[1] = Math.sin(a) * r;
      }
       while (inductionVariable < 10);
    return p;
  }
  function Eng() {
    Eng_instance = this;
    this.n8_1 = new Float64Array(15000);
    this.o8_1 = new Float64Array(15000);
    this.p8_1 = new Float64Array(15000);
    this.q8_1 = new Float64Array(15000);
    this.r8_1 = new Float64Array(15000);
    this.s8_1 = new Float64Array(15000);
    this.t8_1 = new Float64Array(45000);
    this.u8_1 = new Float64Array(45000);
    this.v8_1 = false;
    this.w8_1 = new Float64Array(3);
    this.x8_1 = new Float64Array(3);
    this.y8_1 = new Float64Array(3);
    this.z8_1 = new Float64Array(64);
    this.a9_1 = new Int32Array(32);
    this.b9_1 = new Int32Array(32);
    this.c9_1 = new Float64Array(3);
    this.d9_1 = HashMap_init_$Create$();
    var inductionVariable = 0;
    if (inductionVariable < 15000)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.n8_1[i] = i * 0.618033988749895 % 1.0;
        this.o8_1[i] = i * 0.7548776662466927 % 1.0;
        this.p8_1[i] = Default_getInstance().d5();
        this.q8_1[i] = Default_getInstance().d5();
        this.r8_1[i] = Default_getInstance().d5();
        this.s8_1[i] = Default_getInstance().d5();
      }
       while (inductionVariable < 15000);
    var vi = 0;
    var a = -1.0;
    while (a <= 1.0) {
      var b = -1.0;
      while (b <= 1.0) {
        var c = -1.0;
        while (c <= 1.0) {
          var d = -1.0;
          while (d <= 1.0) {
            this.z8_1[vi] = a;
            this.z8_1[vi + 1 | 0] = b;
            this.z8_1[vi + 2 | 0] = c;
            this.z8_1[vi + 3 | 0] = d;
            vi = vi + 4 | 0;
            d = d + 2.0;
          }
          c = c + 2.0;
        }
        b = b + 2.0;
      }
      a = a + 2.0;
    }
    var ei = 0;
    var inductionVariable_0 = 0;
    if (inductionVariable_0 < 16)
      do {
        var p = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var inductionVariable_1 = p + 1 | 0;
        if (inductionVariable_1 < 16)
          do {
            var q = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var diff = 0;
            var inductionVariable_2 = 0;
            if (inductionVariable_2 < 4)
              do {
                var k = inductionVariable_2;
                inductionVariable_2 = inductionVariable_2 + 1 | 0;
                if (!(this.z8_1[imul(p, 4) + k | 0] === this.z8_1[imul(q, 4) + k | 0])) {
                  diff = diff + 1 | 0;
                }
              }
               while (inductionVariable_2 < 4);
            if (diff === 1) {
              this.a9_1[ei] = p;
              this.b9_1[ei] = q;
              ei = ei + 1 | 0;
            }
          }
           while (inductionVariable_1 < 16);
      }
       while (inductionVariable_0 < 16);
  }
  protoOf(Eng).e9 = function () {
    if (this.v8_1)
      return Unit_instance;
    var count = 0;
    var att = 0;
    var eps = 0.0045;
    while (count < 15000 && att < 2400000) {
      var x = (Default_getInstance().d5() * 2.0 - 1.0) * 1.35;
      var y = (Default_getInstance().d5() * 2.0 - 1.0) * 0.75;
      var z = (Default_getInstance().d5() * 2.0 - 1.0) * 1.15;
      att = att + 1 | 0;
      var a = x * x + 2.25 * y * y + z * z - 1.0;
      var f = a * a * a - x * x * z * z * z - 0.1125 * y * y * z * z * z;
      // Inline function 'kotlin.math.abs' call
      if (Math.abs(f) < eps) {
        var j = imul(count, 3);
        this.u8_1[j] = x * 0.95;
        this.u8_1[j + 1 | 0] = z * 0.95;
        this.u8_1[j + 2 | 0] = y * 0.95;
        count = count + 1 | 0;
      }
      if ((att % 200000 | 0) === 0 && count < 15000)
        eps = eps * 1.7;
    }
    while (count < 15000) {
      var tmp = Default_getInstance().d5();
      // Inline function 'kotlin.math.max' call
      var b = count;
      var tmp$ret$1 = Math.max(1, b);
      var src = numberToInt(tmp * tmp$ret$1);
      var j_0 = imul(count, 3);
      var k = imul(src, 3);
      this.u8_1[j_0] = this.u8_1[k] + (Default_getInstance().d5() - 0.5) * 0.02;
      this.u8_1[j_0 + 1 | 0] = this.u8_1[k + 1 | 0] + (Default_getInstance().d5() - 0.5) * 0.02;
      this.u8_1[j_0 + 2 | 0] = this.u8_1[k + 2 | 0] + (Default_getInstance().d5() - 0.5) * 0.02;
      count = count + 1 | 0;
    }
    this.v8_1 = true;
  };
  protoOf(Eng).f9 = function (key) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.d9_1;
    var value = this_0.s(key);
    var tmp;
    if (value == null) {
      var answer = key === 'tri' ? poly(Eng_getInstance(), 3, 1.55) : key === 'square' ? poly(Eng_getInstance(), 4, 1.45) : key === 'pent' ? poly(Eng_getInstance(), 5, 1.45) : key === 'hex' ? poly(Eng_getInstance(), 6, 1.35) : key === 'star' ? starPts(Eng_getInstance()) : poly(Eng_getInstance(), 3, 1.5);
      this_0.z1(key, answer);
      tmp = answer;
    } else {
      tmp = value;
    }
    return tmp;
  };
  protoOf(Eng).g9 = function (T, o) {
    // Inline function 'kotlin.math.cos' call
    var x = 3.0 * T;
    var w = 2.0 + Math.cos(x);
    // Inline function 'kotlin.math.cos' call
    var x_0 = 2.0 * T;
    o[0] = w * Math.cos(x_0) * 0.55;
    // Inline function 'kotlin.math.sin' call
    var x_1 = 3.0 * T;
    o[1] = Math.sin(x_1) * 0.63;
    // Inline function 'kotlin.math.sin' call
    var x_2 = 2.0 * T;
    o[2] = w * Math.sin(x_2) * 0.55;
  };
  protoOf(Eng).h9 = function (key, i, t, out) {
    var u = this.n8_1[i];
    var v = this.o8_1[i];
    var r1 = this.p8_1[i];
    var r2 = this.q8_1[i];
    var r3 = this.r8_1[i];
    var r4 = this.s8_1[i];
    var j = imul(i, 3);
    switch (key) {
      case 'sphere':
        var th = u * get_TAU();
        var y0 = 1.0 - 2.0 * v;
        // Inline function 'kotlin.math.sin' call

        var x = t * 1.1 + y0 * 1.8;
        var R = 1.55 * (1.0 + 0.05 * Math.sin(x));
        // Inline function 'kotlin.math.max' call

        var b = 1.0 - y0 * y0;
        // Inline function 'kotlin.math.sqrt' call

        var x_0 = Math.max(0.0, b);
        var rr = Math.sqrt(x_0);
        // Inline function 'kotlin.math.cos' call

        out[0] = rr * Math.cos(th) * R;
        out[1] = y0 * R;
        // Inline function 'kotlin.math.sin' call

        out[2] = rr * Math.sin(th) * R;
        break;
      case 'tri':
      case 'square':
      case 'pent':
      case 'hex':
      case 'star':
        var P = this.f9(key);
        var C = P.length;
        var tmp6 = C - 1 | 0;
        // Inline function 'kotlin.math.min' call

        var b_0 = numberToInt(u * C);
        var e = Math.min(tmp6, b_0);
        var f = u * C - e;
        var p0 = P[e];
        var p1 = P[(e + 1 | 0) % C | 0];
        // Inline function 'kotlin.math.sin' call

        var x_1 = t * 1.4;
        var br = 1.0 + 0.03 * Math.sin(x_1);
        out[0] = (p0[0] + (p1[0] - p0[0]) * f) * br;
        out[2] = (p0[1] + (p1[1] - p0[1]) * f) * br;
        out[1] = (key === 'star' ? 0.4 : 0.55) * (v * 2.0 - 1.0);
        break;
      case 'heart':
        this.e9();
        // Inline function 'kotlin.math.sin' call

        var x_2 = t * 4.2;
        // Inline function 'kotlin.math.max' call

        var b_1 = Math.sin(x_2);
        // Inline function 'kotlin.math.pow' call

        var this_0 = Math.max(0.0, b_1);
        var s0 = Math.pow(this_0, 10);
        // Inline function 'kotlin.math.sin' call

        var x_3 = t * 4.2 - 0.7;
        // Inline function 'kotlin.math.max' call

        var b_2 = Math.sin(x_3);
        // Inline function 'kotlin.math.pow' call

        var this_1 = Math.max(0.0, b_2);
        var s1 = Math.pow(this_1, 10);
        var sc = 1.0 + 0.085 * (s0 + 0.55 * s1);
        out[0] = this.u8_1[j] * sc;
        out[1] = this.u8_1[j + 1 | 0] * sc;
        out[2] = this.u8_1[j + 2 | 0] * sc;
        break;
      case 'galaxy':
        if (r4 < 0.05) {
          var ang = r1 * get_TAU();
          var cc = r2 * 2.0 - 1.0;
          // Inline function 'kotlin.math.max' call
          var b_3 = 1.0 - cc * cc;
          // Inline function 'kotlin.math.sqrt' call
          var x_4 = Math.max(0.0, b_3);
          var sq = Math.sqrt(x_4);
          var r = 1.2 + 1.6 * r3;
          // Inline function 'kotlin.math.cos' call
          out[0] = Math.cos(ang) * sq * r;
          out[1] = cc * r * 0.85;
          // Inline function 'kotlin.math.sin' call
          out[2] = Math.sin(ang) * sq * r;
        } else {
          var ai = numberToInt(u * 3);
          // Inline function 'kotlin.math.pow' call
          var rad = 0.3 + 2.0 * Math.pow(v, 0.6);
          var fuzz = (r2 - 0.5) * 2.0 * (0.14 + 0.3 * rad / 2.3);
          var ang_0 = ai * (get_TAU() / 3.0) + rad * 2.15 + fuzz + t * (0.5 + 0.5 / (0.6 + rad));
          // Inline function 'kotlin.math.exp' call
          var x_5 = -rad * 1.1;
          var th_0 = 0.26 * Math.exp(x_5) + 0.035;
          // Inline function 'kotlin.math.cos' call
          out[0] = rad * Math.cos(ang_0);
          out[1] = (r3 - 0.5) * 2.0 * th_0;
          // Inline function 'kotlin.math.sin' call
          out[2] = rad * Math.sin(ang_0);
        }

        break;
      case 'mobius':
        var uu = u * 2.0 * get_TAU() + t * 0.8;
        var w = v * 2.0 - 1.0;
        // Inline function 'kotlin.math.cos' call

        var x_6 = uu / 2.0;
        var c = Math.cos(x_6);
        // Inline function 'kotlin.math.sin' call

        var x_7 = uu / 2.0;
        var s = Math.sin(x_7);
        var rr_0 = 1.25 + 0.6 * w * c;
        // Inline function 'kotlin.math.cos' call

        out[0] = rr_0 * Math.cos(uu);
        out[1] = 0.6 * w * s;
        // Inline function 'kotlin.math.sin' call

        out[2] = rr_0 * Math.sin(uu);
        break;
      case 'klein':
        var uu_0 = u * get_TAU();
        var vv = v * get_TAU() + t * 0.35;
        // Inline function 'kotlin.math.cos' call

        var x_8 = uu_0 / 2.0;
        var cu = Math.cos(x_8);
        // Inline function 'kotlin.math.sin' call

        var x_9 = uu_0 / 2.0;
        var su = Math.sin(x_9);
        // Inline function 'kotlin.math.sin' call

        var sv = Math.sin(vv);
        // Inline function 'kotlin.math.sin' call

        var x_10 = 2.0 * vv;
        var s2v = Math.sin(x_10);
        var r_0 = 2.0 + cu * sv - su * s2v;
        // Inline function 'kotlin.math.cos' call

        out[0] = r_0 * Math.cos(uu_0) * 0.55;
        out[1] = (su * sv + cu * s2v) * 0.75;
        // Inline function 'kotlin.math.sin' call

        out[2] = r_0 * Math.sin(uu_0) * 0.55;
        break;
      case 'knot':
        var T = u * get_TAU() + t * 0.14;
        this.g9(T, this.w8_1);
        this.g9(T + 0.01, this.x8_1);
        this.g9(T - 0.01, this.y8_1);
        var tx = this.x8_1[0] - this.y8_1[0];
        var ty = this.x8_1[1] - this.y8_1[1];
        var tz = this.x8_1[2] - this.y8_1[2];
        // Inline function 'kotlin.math.sqrt' call

        var x_11 = tx * tx + ty * ty + tz * tz;
        var l = Math.sqrt(x_11);
        if (l <= 0.0)
          l = 1.0;
        tx = tx / l;
        ty = ty / l;
        tz = tz / l;
        var ax = ty * 0.15 - tz;
        var ay = tz * 0.25 - tx * 0.15;
        var az = tx - ty * 0.25;
        // Inline function 'kotlin.math.sqrt' call

        var x_12 = ax * ax + ay * ay + az * az;
        l = Math.sqrt(x_12);
        if (l < 1.0E-4) {
          ax = 1.0;
          ay = 0.0;
          az = 0.0;
          l = 1.0;
        }

        ax = ax / l;
        ay = ay / l;
        az = az / l;
        var bx = ty * az - tz * ay;
        var by = tz * ax - tx * az;
        var bz = tx * ay - ty * ax;
        var ph = v * get_TAU() + t * 0.6;
        var off = 0.17 * (0.8 + 0.4 * r4);
        // Inline function 'kotlin.math.cos' call

        var co = Math.cos(ph) * off;
        // Inline function 'kotlin.math.sin' call

        var si = Math.sin(ph) * off;
        out[0] = this.w8_1[0] + ax * co + bx * si;
        out[1] = this.w8_1[1] + ay * co + by * si;
        out[2] = this.w8_1[2] + az * co + bz * si;
        break;
      case 'tesseract':
        var e_0 = numberToInt(u * 32);
        var q = u * 32.0 - e_0;
        var va = imul(this.a9_1[e_0], 4);
        var vb = imul(this.b9_1[e_0], 4);
        var px = this.z8_1[va] + (this.z8_1[vb] - this.z8_1[va]) * q;
        var py = this.z8_1[va + 1 | 0] + (this.z8_1[vb + 1 | 0] - this.z8_1[va + 1 | 0]) * q;
        var pz = this.z8_1[va + 2 | 0] + (this.z8_1[vb + 2 | 0] - this.z8_1[va + 2 | 0]) * q;
        var pw = this.z8_1[va + 3 | 0] + (this.z8_1[vb + 3 | 0] - this.z8_1[va + 3 | 0]) * q;
        var A = t * 0.5;
        var B = t * 0.35;
        // Inline function 'kotlin.math.cos' call

        var ca = Math.cos(A);
        // Inline function 'kotlin.math.sin' call

        var sa = Math.sin(A);
        // Inline function 'kotlin.math.cos' call

        var cb = Math.cos(B);
        // Inline function 'kotlin.math.sin' call

        var sb = Math.sin(B);
        var x1 = px * ca - pw * sa;
        var w1 = px * sa + pw * ca;
        var y1 = py * cb - pz * sb;
        var z1 = py * sb + pz * cb;
        var k = 3.2 / (3.2 - w1) * 0.85;
        out[0] = x1 * k;
        out[1] = y1 * k;
        out[2] = z1 * k;
        break;
      case 'nova':
        var rad_0 = 3.2 * (0.3 + 0.7 * r3);
        var phi = r1 * get_TAU() + t * 0.42;
        var e_1 = (r2 * 2.0 - 1.0) * 0.92;
        // Inline function 'kotlin.math.max' call

        var b_4 = 1.0 - e_1 * e_1;
        // Inline function 'kotlin.math.sqrt' call

        var x_13 = Math.max(0.0, b_4);
        var sq_0 = Math.sqrt(x_13);
        // Inline function 'kotlin.math.cos' call

        out[0] = Math.cos(phi) * sq_0 * rad_0;
        var tmp = e_1 * rad_0 * 0.62;
        // Inline function 'kotlin.math.sin' call

        var x_14 = t * 0.9 + r4 * get_TAU();
        out[1] = tmp + 0.12 * Math.sin(x_14);
        // Inline function 'kotlin.math.sin' call

        out[2] = Math.sin(phi) * sq_0 * rad_0;
        break;
      default:
        out[0] = 0.0;
        out[1] = 0.0;
        out[2] = 0.0;
        break;
    }
  };
  var Eng_instance;
  function Eng_getInstance() {
    if (Eng_instance == null)
      new Eng();
    return Eng_instance;
  }
  function ioCubic(p) {
    _init_properties_web_kt__le8mgy();
    var tmp;
    if (p < 0.5) {
      tmp = 4.0 * p * p * p;
    } else {
      // Inline function 'kotlin.math.pow' call
      var this_0 = -2.0 * p + 2.0;
      tmp = 1.0 - Math.pow(this_0, 3) / 2.0;
    }
    return tmp;
  }
  function backE(k) {
    _init_properties_web_kt__le8mgy();
    return backE$lambda(k);
  }
  function Blend() {
    Blend_instance = this;
    this.i9_1 = false;
    this.j9_1 = 'sphere';
    this.k9_1 = 0.0;
    this.l9_1 = 1.0;
    this.m9_1 = 1.0;
    this.n9_1 = null;
    this.o9_1 = new Float64Array(45000);
    this.p9_1 = new Float64Array(45000);
    this.q9_1 = new Float64Array(15000);
  }
  var Blend_instance;
  function Blend_getInstance() {
    if (Blend_instance == null)
      new Blend();
    return Blend_instance;
  }
  function startBlend(key, dur, ease, stagger, swirlAmp) {
    _init_properties_web_kt__le8mgy();
    var tmp0 = Eng_getInstance().t8_1;
    // Inline function 'kotlin.collections.copyInto' call
    var destination = Blend_getInstance().o9_1;
    var endIndex = tmp0.length;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, destination, 0, 0, endIndex);
    var inductionVariable = 0;
    if (inductionVariable < 15000)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var j = imul(i, 3);
        Eng_getInstance().h9(key, i, Engine_getInstance().s9_1, Eng_getInstance().c9_1);
        var tx = Eng_getInstance().c9_1[0] - Blend_getInstance().o9_1[j];
        var ty = Eng_getInstance().c9_1[1] - Blend_getInstance().o9_1[j + 1 | 0];
        var tz = Eng_getInstance().c9_1[2] - Blend_getInstance().o9_1[j + 2 | 0];
        // Inline function 'kotlin.math.sqrt' call
        var x = tx * tx + ty * ty + tz * tz;
        var tl = Math.sqrt(x);
        if (tl > 0.03) {
          var ax = Eng_getInstance().q8_1[i] - 0.5;
          var ay = Eng_getInstance().r8_1[i] - 0.5;
          var az = Eng_getInstance().s8_1[i] - 0.5;
          // Inline function 'kotlin.math.sqrt' call
          var x_0 = ax * ax + ay * ay + az * az;
          var al = Math.sqrt(x_0);
          var nx;
          var ny;
          var nz;
          if (al <= 0.0) {
            nx = 1.0;
            ny = 0.0;
            nz = 0.0;
          } else {
            nx = ax / al;
            ny = ay / al;
            nz = az / al;
          }
          var cx = ty * nz - tz * ny;
          var cy = tz * nx - tx * nz;
          var cz = tx * ny - ty * nx;
          // Inline function 'kotlin.math.sqrt' call
          var x_1 = cx * cx + cy * cy + cz * cz;
          var cl = Math.sqrt(x_1);
          var mag = (Eng_getInstance().p8_1[i] - 0.5) * 2.0 * swirlAmp;
          if (cl <= 0.0) {
            Blend_getInstance().p9_1[j] = 0.0;
            Blend_getInstance().p9_1[j + 1 | 0] = 0.0;
            Blend_getInstance().p9_1[j + 2 | 0] = 0.0;
          } else {
            Blend_getInstance().p9_1[j] = cx / cl * mag;
            Blend_getInstance().p9_1[j + 1 | 0] = cy / cl * mag;
            Blend_getInstance().p9_1[j + 2 | 0] = cz / cl * mag;
          }
        } else {
          Blend_getInstance().p9_1[j] = 0.0;
          Blend_getInstance().p9_1[j + 1 | 0] = 0.0;
          Blend_getInstance().p9_1[j + 2 | 0] = 0.0;
        }
        Blend_getInstance().q9_1[i] = stagger * dur * Eng_getInstance().r8_1[i];
      }
       while (inductionVariable < 15000);
    Blend_getInstance().j9_1 = key;
    Blend_getInstance().k9_1 = 0.0;
    Blend_getInstance().l9_1 = dur;
    Blend_getInstance().m9_1 = dur * (1.0 - stagger);
    Blend_getInstance().n9_1 = ease;
    Blend_getInstance().i9_1 = true;
  }
  function Cam(d, el, spin) {
    this.ea_1 = d;
    this.fa_1 = el;
    this.ga_1 = spin;
  }
  function Engine() {
    Engine_instance = this;
    this.r9_1 = mapOf([to('sphere', new Cam(4.6, 0.24, 0.12)), to('tri', new Cam(4.6, 0.35, 0.22)), to('square', new Cam(4.6, 0.35, 0.22)), to('pent', new Cam(4.6, 0.35, 0.22)), to('hex', new Cam(4.6, 0.38, 0.2)), to('star', new Cam(4.9, 0.3, 0.26)), to('heart', new Cam(4.6, 0.14, 0.1)), to('galaxy', new Cam(5.9, 0.96, 0.07)), to('mobius', new Cam(4.7, 0.45, 0.16)), to('klein', new Cam(4.7, 0.55, 0.2)), to('knot', new Cam(5.3, 0.55, 0.16)), to('tesseract', new Cam(6.2, 0.28, 0.18)), to('nova', new Cam(6.8, 0.3, 0.09))]);
    this.s9_1 = 0.0;
    this.t9_1 = 'sphere';
    this.u9_1 = 0.6;
    this.v9_1 = 4.6;
    this.w9_1 = 0.24;
    this.x9_1 = 0.12;
    this.y9_1 = 0.53;
    this.z9_1 = 0.0;
    this.aa_1 = 300;
    this.ba_1 = -1;
    this.ca_1 = 'sphere';
    this.da_1 = 0.0;
  }
  protoOf(Engine).ha = function (key) {
    var tmp0_elvis_lhs = this.r9_1.s(key);
    return tmp0_elvis_lhs == null ? new Cam(4.6, 0.3, 0.2) : tmp0_elvis_lhs;
  };
  var Engine_instance;
  function Engine_getInstance() {
    if (Engine_instance == null)
      new Engine();
    return Engine_instance;
  }
  function initGl() {
    _init_properties_web_kt__le8mgy();
    set_canvas(doc().getElementById('c'));
    set_gl(get_canvas().getContext('webgl', {antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'high-performance'}));
    if (get_gl() == null) {
      E('fallback').style.display = 'grid';
      return false;
    }
    var vs = initGl$mkShader(get_gl().VERTEX_SHADER, get_VSH());
    var fs = initGl$mkShader(get_gl().FRAGMENT_SHADER, get_FSH());
    if (vs == null || fs == null) {
      E('fallback').style.display = 'grid';
      return false;
    }
    var prog = get_gl().createProgram();
    get_gl().attachShader(prog, vs);
    get_gl().attachShader(prog, fs);
    get_gl().linkProgram(prog);
    var tmp = get_gl().getProgramParameter(prog, get_gl().LINK_STATUS);
    if (!((!(tmp == null) ? typeof tmp === 'boolean' : false) ? tmp : THROW_CCE())) {
      win().console.log(get_gl().getProgramInfoLog(prog));
      E('fallback').style.display = 'grid';
      return false;
    }
    get_gl().useProgram(prog);
    set_APOS(get_gl().getAttribLocation(prog, 'aPos'));
    set_ASEED(get_gl().getAttribLocation(prog, 'aSeed'));
    get_gl().enableVertexAttribArray(get_APOS());
    get_gl().enableVertexAttribArray(get_ASEED());
    set_uProj(get_gl().getUniformLocation(prog, 'uProj'));
    set_uAz(get_gl().getUniformLocation(prog, 'uAz'));
    set_uEl(get_gl().getUniformLocation(prog, 'uEl'));
    set_uDist(get_gl().getUniformLocation(prog, 'uDist'));
    set_uTime(get_gl().getUniformLocation(prog, 'uTime'));
    set_uHue(get_gl().getUniformLocation(prog, 'uHue'));
    set_uSat(get_gl().getUniformLocation(prog, 'uSat'));
    set_uLight(get_gl().getUniformLocation(prog, 'uLight'));
    set_uBright(get_gl().getUniformLocation(prog, 'uBright'));
    set_uSize(get_gl().getUniformLocation(prog, 'uSize'));
    set_uScale(get_gl().getUniformLocation(prog, 'uScale'));
    get_gl().disable(get_gl().DEPTH_TEST);
    get_gl().enable(get_gl().BLEND);
    get_gl().blendFunc(get_gl().SRC_ALPHA, get_gl().ONE);
    get_gl().clearColor(0.012, 0.01, 0.032, 1.0);
    set_posF32(mkf32(45000));
    set_seedF32(mkf32(60000));
    var inductionVariable = 0;
    if (inductionVariable < 15000)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        get_seedF32()[imul(i, 4)] = Eng_getInstance().p8_1[i];
        get_seedF32()[imul(i, 4) + 1 | 0] = Eng_getInstance().q8_1[i];
        get_seedF32()[imul(i, 4) + 2 | 0] = Eng_getInstance().r8_1[i];
        get_seedF32()[imul(i, 4) + 3 | 0] = Eng_getInstance().s8_1[i];
      }
       while (inductionVariable < 15000);
    set_starF32(mkf32(1140));
    set_starSeedF32(mkf32(1520));
    var inductionVariable_0 = 0;
    if (inductionVariable_0 < 380)
      do {
        var i_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var a = Default_getInstance().d5() * get_TAU();
        var cc = Default_getInstance().d5() * 2.0 - 1.0;
        // Inline function 'kotlin.math.sqrt' call
        var x = 1.0 - cc * cc;
        var sq = Math.sqrt(x);
        var r = 26.0 + 36.0 * Default_getInstance().d5();
        // Inline function 'kotlin.math.cos' call
        var tmp$ret$1 = Math.cos(a);
        get_starF32()[imul(i_0, 3)] = tmp$ret$1 * sq * r;
        get_starF32()[imul(i_0, 3) + 1 | 0] = cc * r;
        // Inline function 'kotlin.math.sin' call
        var tmp$ret$2 = Math.sin(a);
        get_starF32()[imul(i_0, 3) + 2 | 0] = tmp$ret$2 * sq * r;
        get_starSeedF32()[imul(i_0, 4)] = Default_getInstance().d5();
        get_starSeedF32()[imul(i_0, 4) + 1 | 0] = 0.3 + 0.7 * Default_getInstance().d5();
        get_starSeedF32()[imul(i_0, 4) + 2 | 0] = Default_getInstance().d5();
        get_starSeedF32()[imul(i_0, 4) + 3 | 0] = Default_getInstance().d5();
      }
       while (inductionVariable_0 < 380);
    set_projF32(mkf32(16));
    set_posBuf(get_gl().createBuffer());
    get_gl().bindBuffer(get_gl().ARRAY_BUFFER, get_posBuf());
    get_gl().bufferData(get_gl().ARRAY_BUFFER, get_posF32(), get_gl().DYNAMIC_DRAW);
    set_seedBuf(get_gl().createBuffer());
    get_gl().bindBuffer(get_gl().ARRAY_BUFFER, get_seedBuf());
    get_gl().bufferData(get_gl().ARRAY_BUFFER, get_seedF32(), get_gl().STATIC_DRAW);
    set_starBuf(get_gl().createBuffer());
    get_gl().bindBuffer(get_gl().ARRAY_BUFFER, get_starBuf());
    get_gl().bufferData(get_gl().ARRAY_BUFFER, get_starF32(), get_gl().STATIC_DRAW);
    set_starSeedBuf(get_gl().createBuffer());
    get_gl().bindBuffer(get_gl().ARRAY_BUFFER, get_starSeedBuf());
    get_gl().bufferData(get_gl().ARRAY_BUFFER, get_starSeedF32(), get_gl().STATIC_DRAW);
    return true;
  }
  function setProj(aspect) {
    _init_properties_web_kt__le8mgy();
    // Inline function 'kotlin.math.tan' call
    var x = 21.0 * 3.141592653589793 / 180.0;
    var f = 1.0 / Math.tan(x);
    var near = 0.1;
    var far = 100.0;
    var m = new Float64Array(16);
    m[0] = f / aspect;
    m[5] = f;
    m[10] = -(far + near) / (far - near);
    m[11] = -1.0;
    m[14] = -(2.0 * far * near) / (far - near);
    var inductionVariable = 0;
    if (inductionVariable < 16)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        get_projF32()[k] = m[k];
      }
       while (inductionVariable < 16);
    get_gl().uniformMatrix4fv(get_uProj(), false, get_projF32());
  }
  function resize() {
    _init_properties_web_kt__le8mgy();
    var dprRaw = win().devicePixelRatio;
    var tmp;
    if (dprRaw == null) {
      tmp = 1.0;
    } else {
      // Inline function 'kotlin.math.min' call
      var b = (!(dprRaw == null) ? typeof dprRaw === 'number' : false) ? dprRaw : THROW_CCE();
      tmp = Math.min(2.0, b);
    }
    var dpr = tmp;
    var tmp_0 = get_canvas().clientWidth;
    var cw = (!(tmp_0 == null) ? typeof tmp_0 === 'number' : false) ? tmp_0 : THROW_CCE();
    var tmp_1 = get_canvas().clientHeight;
    var ch = (!(tmp_1 == null) ? typeof tmp_1 === 'number' : false) ? tmp_1 : THROW_CCE();
    // Inline function 'kotlin.math.floor' call
    var x = cw * dpr;
    var tmp$ret$1 = Math.floor(x);
    // Inline function 'kotlin.math.max' call
    var b_0 = numberToInt(tmp$ret$1);
    var w = Math.max(1, b_0);
    // Inline function 'kotlin.math.floor' call
    var x_0 = ch * dpr;
    var tmp$ret$3 = Math.floor(x_0);
    // Inline function 'kotlin.math.max' call
    var b_1 = numberToInt(tmp$ret$3);
    var h = Math.max(1, b_1);
    if (w === get_Wc() && h === get_Hc())
      return Unit_instance;
    set_Wc(w);
    set_Hc(h);
    get_canvas().width = w;
    get_canvas().height = h;
    get_gl().viewport(0, 0, w, h);
    setProj(w / h);
    get_gl().uniform1f(get_uScale(), h / 380.0);
    // Inline function 'kotlin.math.max' call
    var b_2 = 0.9 / (w / h);
    // Inline function 'kotlin.math.min' call
    var b_3 = Math.max(1.0, b_2);
    var tmp$ret$6 = Math.min(1.55, b_3);
    set_distFactor(tmp$ret$6);
  }
  function saveGame() {
    _init_properties_web_kt__le8mgy();
    var tmp = get_S();
    var tmp_0 = win().Date.now();
    tmp.k8_1 = (!(tmp_0 == null) ? typeof tmp_0 === 'number' : false) ? tmp_0 : THROW_CCE();
    get_S().l8_1 = incomeOf(get_S(), get_S().i8_1);
    store().setItem('flutterlight_kt_v1', serialize(get_S()));
  }
  function loadGame() {
    _init_properties_web_kt__le8mgy();
    var raw = store().getItem('flutterlight_kt_v1');
    if (raw == null)
      return false;
    var parsed = deserialize((!(raw == null) ? typeof raw === 'string' : false) ? raw : THROW_CCE());
    if (parsed == null)
      return false;
    set_S(parsed);
    return true;
  }
  function hueTarget() {
    _init_properties_web_kt__le8mgy();
    var b = -1;
    var inductionVariable = 0;
    if (inductionVariable <= 6)
      do {
        var k = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (get_S().y7_1[k] > 0)
          b = k;
      }
       while (inductionVariable <= 6);
    if (b < 0)
      return 0.53;
    return get_BANDHUES()[b] + 0.015 * get_S().y7_1[b];
  }
  function toast(msg) {
    _init_properties_web_kt__le8mgy();
    var d = doc().createElement('div');
    d.className = 'toast';
    d.textContent = msg;
    E('toasts').appendChild(d);
    win().setTimeout(toast$lambda(d), 2800);
    win().setTimeout(toast$lambda_0(d), 3800);
    var kids = E('toasts').children;
    var tmp = kids.length;
    var len = (!(tmp == null) ? typeof tmp === 'number' : false) ? tmp : THROW_CCE();
    if (len > 4) {
      kids[0].remove();
    }
  }
  function cerOn(nameText, subText) {
    _init_properties_web_kt__le8mgy();
    E('cerName').textContent = nameText;
    E('cerSub').textContent = subText;
    E('cer').classList.add('on');
  }
  function cerOff() {
    _init_properties_web_kt__le8mgy();
    E('cer').classList.remove('on');
  }
  function BandRow(idx, btn, cost, sub, p0, p1, p2, p3, p4) {
    this.ia_1 = idx;
    this.ja_1 = btn;
    this.ka_1 = cost;
    this.la_1 = sub;
    this.ma_1 = p0;
    this.na_1 = p1;
    this.oa_1 = p2;
    this.pa_1 = p3;
    this.qa_1 = p4;
  }
  protoOf(BandRow).ra = function () {
    var lvl = get_S().y7_1[this.ia_1];
    this.ma_1.className = lvl > 0 ? 'f' : '';
    this.na_1.className = lvl > 1 ? 'f' : '';
    this.oa_1.className = lvl > 2 ? 'f' : '';
    this.pa_1.className = lvl > 3 ? 'f' : '';
    this.qa_1.className = lvl > 4 ? 'f' : '';
    this.la_1.textContent = lvl >= 5 ? 'MASTERED' : '\xD71.10 all production';
    var c = bandCost(this.ia_1, lvl);
    this.ja_1.disabled = lvl >= 5 || get_S().t7_1 < c;
    this.ka_1.textContent = lvl >= 5 ? 'DONE' : fmt(c);
  };
  function buildSpectrumRows() {
    _init_properties_web_kt__le8mgy();
    var wrap = E('bandRows');
    var inductionVariable = 0;
    if (inductionVariable <= 6)
      do {
        var b = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var row = doc().createElement('div');
        row.className = 'row';
        var who = doc().createElement('div');
        who.className = 'who';
        var nameB = doc().createElement('b');
        nameB.textContent = get_BANDNAMES()[b] + ' BAND';
        var pips = doc().createElement('span');
        pips.className = 'pips';
        var p0 = doc().createElement('i');
        var p1 = doc().createElement('i');
        var p2 = doc().createElement('i');
        var p3 = doc().createElement('i');
        var p4 = doc().createElement('i');
        pips.appendChild(p0);
        pips.appendChild(p1);
        pips.appendChild(p2);
        pips.appendChild(p3);
        pips.appendChild(p4);
        nameB.appendChild(pips);
        var sub = doc().createElement('span');
        who.appendChild(nameB);
        who.appendChild(sub);
        var btn = doc().createElement('button');
        btn.className = 'buy';
        btn.textContent = '+1';
        var cost = doc().createElement('span');
        cost.className = 'cost';
        btn.appendChild(cost);
        row.appendChild(who);
        row.appendChild(btn);
        wrap.appendChild(row);
        var band = b;
        btn.addEventListener('click', buildSpectrumRows$lambda(band));
        get_bandRows().l1(new BandRow(band, btn, cost, sub, p0, p1, p2, p3, p4));
      }
       while (inductionVariable <= 6);
  }
  function ShopRow(btn, cost, sub, update) {
    this.sa_1 = btn;
    this.ta_1 = cost;
    this.ua_1 = sub;
    this.va_1 = update;
  }
  function addShopRow(label, onClick, update) {
    _init_properties_web_kt__le8mgy();
    var wrap = E('shopRows');
    var row = doc().createElement('div');
    row.className = 'row';
    var who = doc().createElement('div');
    who.className = 'who';
    var b = doc().createElement('b');
    b.textContent = label;
    var sub = doc().createElement('span');
    who.appendChild(b);
    who.appendChild(sub);
    var btn = doc().createElement('button');
    btn.className = 'buy';
    btn.textContent = 'BUY';
    var cost = doc().createElement('span');
    cost.className = 'cost';
    btn.appendChild(cost);
    row.appendChild(who);
    row.appendChild(btn);
    wrap.appendChild(row);
    btn.addEventListener('click', addShopRow$lambda(onClick));
    get_shopRows().l1(new ShopRow(btn, cost, sub, update));
  }
  function buildShopRows() {
    _init_properties_web_kt__le8mgy();
    var tmp = buildShopRows$lambda;
    addShopRow('REFRACTION', tmp, buildShopRows$lambda_0);
    var tmp_0 = buildShopRows$lambda_1;
    addShopRow('HEAD START', tmp_0, buildShopRows$lambda_2);
    var tmp_1 = buildShopRows$lambda_3;
    addShopRow('AFTERGLOW', tmp_1, buildShopRows$lambda_4);
    var tmp_2 = buildShopRows$lambda_5;
    addShopRow('MOMENTUM', tmp_2, buildShopRows$lambda_6);
    var tmp_3 = buildShopRows$lambda_7;
    addShopRow('AUTOPILOT \xB7 PARTICLES', tmp_3, buildShopRows$lambda_8);
    var tmp_4 = buildShopRows$lambda_9;
    addShopRow('AUTOPILOT \xB7 LIGHT', tmp_4, buildShopRows$lambda_10);
    var tmp_5 = buildShopRows$lambda_11;
    addShopRow('AUTOPILOT \xB7 SPECTRUM', tmp_5, buildShopRows$lambda_12);
  }
  function panelShow(t) {
    _init_properties_web_kt__le8mgy();
    E('panel').classList.add('on');
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var secs = ['swarm', 'spectrum', 'gather', 'prism'];
    var inductionVariable = 0;
    var last = secs.length;
    while (inductionVariable < last) {
      var s = secs[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      E('tab-' + s).style.display = s === t ? '' : 'none';
    }
  }
  function setupTabs() {
    _init_properties_web_kt__le8mgy();
    var btns = doc().querySelectorAll('#tabs button');
    var tmp = btns.length;
    var n = (!(tmp == null) ? typeof tmp === 'number' : false) ? tmp : THROW_CCE();
    var inductionVariable = 0;
    if (inductionVariable < n)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var btn = btns[i];
        btn.addEventListener('click', setupTabs$lambda(btn, n, btns));
      }
       while (inductionVariable < n);
  }
  function refreshUI() {
    _init_properties_web_kt__le8mgy();
    var inc = incomeOf(get_S(), get_S().i8_1);
    E('lightVal').textContent = fmt(get_S().t7_1);
    E('lightRate').textContent = fmt(inc) + ' /s';
    E('prismVal').textContent = get_S().a8_1 > 0 || get_S().z7_1 > 0 ? '\u25C6 ' + fmt(get_S().a8_1) : '\u2014';
    if (get_curTab() === 'swarm') {
      E('pCount').textContent = fmt(get_S().w7_1);
      // Inline function 'kotlin.math.pow' call
      var n = get_S().x7_1;
      var tmp$ret$0 = Math.pow(1.25, n);
      E('pInfo').textContent = fmt(1.0 * tmp$ret$0 * shapeMult(get_S().z7_1) * spectrumMult(get_S().y7_1) * prismMult(get_S().b8_1) * momentumMult(get_S(), get_S().i8_1)) + ' light/s each';
      var c1 = particleCost(get_S().w7_1);
      E('bp1').disabled = get_S().t7_1 < c1 || get_S().w7_1 >= 6000;
      E('bp1c').textContent = fmt(c1);
      // Inline function 'kotlin.math.min' call
      var b = maxParticlesAfford(get_S().w7_1, get_S().t7_1);
      var n10 = Math.min(10, b);
      var tmp = get_S().w7_1;
      // Inline function 'kotlin.math.min' call
      var b_0 = 6000 - get_S().w7_1 | 0;
      var tmp$ret$2 = Math.min(10, b_0);
      var c10 = bulkParticleCost(tmp, tmp$ret$2);
      E('bp10').disabled = n10 < 10 || get_S().w7_1 >= 6000;
      E('bp10c').textContent = fmt(c10);
      var nM = maxParticlesAfford(get_S().w7_1, get_S().t7_1);
      E('bpMax').disabled = nM < 1 || get_S().w7_1 >= 6000;
      E('bpMaxc').textContent = nM >= 1 ? '+' + fmt(nM) : '\u2014';
      E('lCount').textContent = fmt(get_S().x7_1);
      // Inline function 'kotlin.math.pow' call
      var n_0 = get_S().x7_1;
      var tmp$ret$3 = Math.pow(1.25, n_0);
      E('lInfo').textContent = '\xD7' + fmt(tmp$ret$3) + ' efficiency';
      var cl1 = lightCost(get_S().x7_1);
      E('bl1').disabled = get_S().t7_1 < cl1 || get_S().x7_1 >= 300;
      E('bl1c').textContent = fmt(cl1);
      var lM = maxLightAfford(get_S().x7_1, get_S().t7_1);
      E('blMax').disabled = lM < 1 || get_S().x7_1 >= 300;
      E('blMaxc').textContent = lM >= 1 ? '+' + fmt(lM) : '\u2014';
      var tmp_0 = 'P ' + fmt(get_S().w7_1) + ' \xD7 level \xD7';
      // Inline function 'kotlin.math.pow' call
      var n_1 = get_S().x7_1;
      var tmp$ret$4 = Math.pow(1.25, n_1);
      E('prodBreak').textContent = tmp_0 + fmt(tmp$ret$4) + ' \xD7 shapes ' + fmtMult(shapeMult(get_S().z7_1)) + ' \xD7 spectrum ' + fmtMult(spectrumMult(get_S().y7_1)) + ' \xD7 refraction ' + fmtMult(prismMult(get_S().b8_1)) + ' \xD7 momentum ' + fmtMult(momentumMult(get_S(), get_S().i8_1));
    }
    if (get_curTab() === 'spectrum') {
      var _iterator__ex2g4s = get_bandRows().e();
      while (_iterator__ex2g4s.f()) {
        var r = _iterator__ex2g4s.g();
        r.ra();
      }
    }
    if (get_curTab() === 'gather') {
      var cur = get_SHAPES().i(get_S().z7_1);
      E('curShape').textContent = 'FORMATION: ' + cur.p7_1 + ' \u2014 ' + cur.q7_1 + ' \xB7 shapes bonus ' + fmtMult(shapeMult(get_S().z7_1));
      var tmp10 = get_S().z7_1 + 1 | 0;
      // Inline function 'kotlin.math.min' call
      var b_1 = get_SHAPES().h() - 1 | 0;
      var nk = Math.min(tmp10, b_1);
      var nx = get_SHAPES().i(nk);
      var req = reqFor(get_S());
      E('nextName').textContent = nx.p7_1;
      E('nextSub').textContent = nx.q7_1 + ' \xB7 ' + fmtMult(nx.r7_1);
      var tmp_1;
      if (req > 0.0) {
        // Inline function 'kotlin.math.min' call
        var b_2 = get_S().u7_1 / req;
        tmp_1 = Math.min(1.0, b_2);
      } else {
        tmp_1 = 0.0;
      }
      var pg = tmp_1;
      E('nextBar').style.width = (pg * 100.0).toString() + '%';
      E('nextReq').textContent = 'requires ' + fmt(req) + ' light earned this run (' + fmt(get_S().u7_1) + ')';
      E('nextPrisms').textContent = '\u25C6 +' + fmt(prismsFor(get_S().u7_1));
      var can = canGather(get_S());
      E('gatherBtn').disabled = !can;
      E('gatherBtn').textContent = can ? 'GATHER' : 'NOT YET';
      var mus = StringBuilder_init_$Create$();
      var inductionVariable = 1;
      var last = get_SHAPES().h();
      if (inductionVariable < last)
        do {
          var k = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var sh = get_SHAPES().i(k);
          var got = k <= get_S().z7_1;
          mus.h4('<div class="musrow"><span class="');
          mus.h4(got ? 'got' : 'lock');
          mus.h4('">').h4(got ? '\u25C6 ' : '\u25C7 ').h4(sh.p7_1);
          mus.h4('<\/span><span class="');
          mus.h4(got ? 'got' : 'lock');
          mus.h4('">').h4(fmtMult(sh.r7_1)).h4('<\/span><\/div>');
        }
         while (inductionVariable < last);
      E('museum').innerHTML = mus.toString();
    }
    if (get_curTab() === 'prism') {
      E('prismNote').textContent = '\u25C6 ' + fmt(get_S().a8_1) + ' prisms \u2014 gathered from runs: cbrt(earnings / 1e4)';
      var _iterator__ex2g4s_0 = get_shopRows().e();
      while (_iterator__ex2g4s_0.f()) {
        var r_0 = _iterator__ex2g4s_0.g();
        r_0.va_1(r_0);
      }
    }
  }
  function engineFrame(dt) {
    _init_properties_web_kt__le8mgy();
    Engine_getInstance().s9_1 = Engine_getInstance().s9_1 + dt;
    var bright = 1.06;
    var inCer = Engine_getInstance().ba_1 >= 0;
    if (inCer) {
      Engine_getInstance().da_1 = Engine_getInstance().da_1 + dt;
      if (Engine_getInstance().ba_1 === 0) {
        startBlend('nova', 0.5, backE(2.6), 0.25, 1.2);
        Engine_getInstance().v9_1 = 6.8;
        Engine_getInstance().w9_1 = 0.3;
        Engine_getInstance().x9_1 = 0.09;
        Engine_getInstance().ba_1 = 1;
      } else if (Engine_getInstance().ba_1 === 1 && Engine_getInstance().da_1 >= 0.55) {
        startBlend(Engine_getInstance().ca_1, 1.15, backE(2.4), 0.3, 0.35);
        Engine_getInstance().ba_1 = 2;
      } else if (Engine_getInstance().ba_1 === 2 && Engine_getInstance().da_1 >= 1.7) {
        Engine_getInstance().t9_1 = Engine_getInstance().ca_1;
        var cam = Engine_getInstance().ha(Engine_getInstance().ca_1);
        Engine_getInstance().v9_1 = cam.ea_1;
        Engine_getInstance().w9_1 = cam.fa_1;
        Engine_getInstance().x9_1 = cam.ga_1;
        Engine_getInstance().ba_1 = 3;
      } else if (Engine_getInstance().ba_1 === 3 && Engine_getInstance().da_1 >= 3.0) {
        Engine_getInstance().ba_1 = -1;
        cerOff();
      }
      // Inline function 'kotlin.math.exp' call
      var x = -Engine_getInstance().da_1 * 1.8;
      bright = 1.3 + 1.9 * Math.exp(x);
      Engine_getInstance().aa_1 = 15000;
    }
    if (Engine_getInstance().ba_1 < 0) {
      Engine_getInstance().x9_1 = Engine_getInstance().ha(Engine_getInstance().t9_1).ga_1;
      var tmp = Engine_getInstance();
      // Inline function 'kotlin.math.max' call
      var b = get_S().w7_1;
      // Inline function 'kotlin.math.pow' call
      var this_0 = Math.max(1.0, b);
      var tmp$ret$2 = Math.pow(this_0, 0.4);
      // Inline function 'kotlin.math.min' call
      var b_0 = numberToInt(400.0 * tmp$ret$2);
      // Inline function 'kotlin.math.max' call
      var b_1 = Math.min(15000, b_0);
      tmp.aa_1 = Math.max(60, b_1);
    }
    Engine_getInstance().u9_1 = Engine_getInstance().u9_1 + Engine_getInstance().x9_1 * dt;
    if (Blend_getInstance().i9_1) {
      Blend_getInstance().k9_1 = Blend_getInstance().k9_1 + dt;
      var anyLive = false;
      var inductionVariable = 0;
      if (inductionVariable < 15000)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var j = imul(i, 3);
          var p = (Blend_getInstance().k9_1 - Blend_getInstance().q9_1[i]) / Blend_getInstance().m9_1;
          if (p > 1.0)
            p = 1.0;
          else if (p < 0.0)
            p = 0.0;
          else
            anyLive = true;
          Eng_getInstance().h9(Blend_getInstance().j9_1, i, Engine_getInstance().s9_1, Eng_getInstance().c9_1);
          if (p >= 1.0) {
            Eng_getInstance().t8_1[j] = Eng_getInstance().c9_1[0];
            Eng_getInstance().t8_1[j + 1 | 0] = Eng_getInstance().c9_1[1];
            Eng_getInstance().t8_1[j + 2 | 0] = Eng_getInstance().c9_1[2];
          } else {
            var easeFn = Blend_getInstance().n9_1;
            var e = !(easeFn == null) ? easeFn(p) : ioCubic(p);
            // Inline function 'kotlin.math.sin' call
            var x_0 = 3.141592653589793 * p;
            var wf = Math.sin(x_0);
            Eng_getInstance().t8_1[j] = Blend_getInstance().o9_1[j] + (Eng_getInstance().c9_1[0] - Blend_getInstance().o9_1[j]) * e + Blend_getInstance().p9_1[j] * wf;
            Eng_getInstance().t8_1[j + 1 | 0] = Blend_getInstance().o9_1[j + 1 | 0] + (Eng_getInstance().c9_1[1] - Blend_getInstance().o9_1[j + 1 | 0]) * e + Blend_getInstance().p9_1[j + 1 | 0] * wf;
            Eng_getInstance().t8_1[j + 2 | 0] = Blend_getInstance().o9_1[j + 2 | 0] + (Eng_getInstance().c9_1[2] - Blend_getInstance().o9_1[j + 2 | 0]) * e + Blend_getInstance().p9_1[j + 2 | 0] * wf;
          }
        }
         while (inductionVariable < 15000);
      if (!anyLive && Blend_getInstance().k9_1 > Blend_getInstance().l9_1)
        Blend_getInstance().i9_1 = false;
    } else {
      var keyNow = Engine_getInstance().t9_1;
      var inductionVariable_0 = 0;
      if (inductionVariable_0 < 15000)
        do {
          var i_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          Eng_getInstance().h9(keyNow, i_0, Engine_getInstance().s9_1, Eng_getInstance().c9_1);
          var j_0 = imul(i_0, 3);
          Eng_getInstance().t8_1[j_0] = Eng_getInstance().c9_1[0];
          Eng_getInstance().t8_1[j_0 + 1 | 0] = Eng_getInstance().c9_1[1];
          Eng_getInstance().t8_1[j_0 + 2 | 0] = Eng_getInstance().c9_1[2];
        }
         while (inductionVariable_0 < 15000);
    }
    var ht = hueTarget();
    var tmp_0 = Engine_getInstance();
    var tmp_1 = Engine_getInstance().y9_1;
    var tmp_2 = ht - Engine_getInstance().y9_1;
    // Inline function 'kotlin.math.min' call
    var b_2 = dt * 0.6;
    tmp_0.y9_1 = tmp_1 + tmp_2 * Math.min(1.0, b_2);
    var tmp_3 = Engine_getInstance();
    var tmp_4 = Engine_getInstance().z9_1;
    // Inline function 'kotlin.math.exp' call
    var x_1 = -dt * 3.2;
    tmp_3.z9_1 = tmp_4 * Math.exp(x_1);
    bright = bright + Engine_getInstance().z9_1;
    get_gl().clear(get_gl().COLOR_BUFFER_BIT);
    get_gl().uniform1f(get_uTime(), Engine_getInstance().s9_1);
    get_gl().uniform1f(get_uAz(), Engine_getInstance().u9_1);
    get_gl().uniform1f(get_uEl(), Engine_getInstance().w9_1);
    get_gl().uniform1f(get_uDist(), Engine_getInstance().v9_1 * get_distFactor());
    get_gl().bindBuffer(get_gl().ARRAY_BUFFER, get_starBuf());
    get_gl().vertexAttribPointer(get_APOS(), 3, get_gl().FLOAT, false, 0, 0);
    get_gl().bindBuffer(get_gl().ARRAY_BUFFER, get_starSeedBuf());
    get_gl().vertexAttribPointer(get_ASEED(), 4, get_gl().FLOAT, false, 0, 0);
    get_gl().uniform1f(get_uHue(), 0.6);
    get_gl().uniform1f(get_uSat(), 0.4);
    get_gl().uniform1f(get_uLight(), 0.8);
    get_gl().uniform1f(get_uBright(), 0.7);
    get_gl().uniform1f(get_uSize(), 3.2);
    get_gl().drawArrays(get_gl().POINTS, 0, 380);
    var inductionVariable_1 = 0;
    if (inductionVariable_1 < 45000)
      do {
        var k = inductionVariable_1;
        inductionVariable_1 = inductionVariable_1 + 1 | 0;
        get_posF32()[k] = Eng_getInstance().t8_1[k];
      }
       while (inductionVariable_1 < 45000);
    get_gl().bindBuffer(get_gl().ARRAY_BUFFER, get_posBuf());
    get_gl().bufferSubData(get_gl().ARRAY_BUFFER, 0, get_posF32());
    get_gl().vertexAttribPointer(get_APOS(), 3, get_gl().FLOAT, false, 0, 0);
    get_gl().bindBuffer(get_gl().ARRAY_BUFFER, get_seedBuf());
    get_gl().vertexAttribPointer(get_ASEED(), 4, get_gl().FLOAT, false, 0, 0);
    get_gl().uniform1f(get_uHue(), Engine_getInstance().y9_1);
    get_gl().uniform1f(get_uSat(), 0.9);
    get_gl().uniform1f(get_uLight(), 0.6);
    get_gl().uniform1f(get_uBright(), bright);
    get_gl().uniform1f(get_uSize(), inCer ? 1.1 : 0.85);
    get_gl().drawArrays(get_gl().POINTS, 0, Engine_getInstance().aa_1);
  }
  function frame(nowMs) {
    _init_properties_web_kt__le8mgy();
    if (!get_rafStarted()) {
      set_lastNow(nowMs);
      set_rafStarted(true);
    }
    // Inline function 'kotlin.math.max' call
    var b = nowMs - get_lastNow();
    // Inline function 'kotlin.math.min' call
    var b_0 = Math.max(0.0, b);
    var dtms = Math.min(50.0, b_0);
    set_lastNow(nowMs);
    var dt = dtms / 1000.0;
    set_acc(get_acc() + dt);
    var steps = 0;
    while (get_acc() >= 0.1 && steps < 50) {
      pureTick(get_S(), 0.1);
      set_acc(get_acc() - 0.1);
      steps = steps + 1 | 0;
    }
    if (steps === 50) {
      set_acc(0.0);
    }
    engineFrame(dt);
    set_uiAcc(get_uiAcc() + dt);
    if (get_uiAcc() >= 0.25) {
      set_uiAcc(0.0);
      refreshUI();
    }
    if (Engine_getInstance().s9_1 > 3.0) {
      E('intro').classList.add('gone');
    }
    win().requestAnimationFrame(frame$lambda);
  }
  function main() {
    _init_properties_web_kt__le8mgy();
    if (!initGl())
      return Unit_instance;
    var hadSave = loadGame();
    Engine_getInstance().t9_1 = get_SHAPES().i(get_S().z7_1).o7_1;
    if (Engine_getInstance().t9_1 === 'heart') {
      Eng_getInstance().e9();
    }
    var cam0 = Engine_getInstance().ha(Engine_getInstance().t9_1);
    Engine_getInstance().v9_1 = cam0.ea_1;
    Engine_getInstance().w9_1 = cam0.fa_1;
    Engine_getInstance().x9_1 = cam0.ga_1;
    if (hadSave) {
      var tmp = win().Date.now();
      var away = (((!(tmp == null) ? typeof tmp === 'number' : false) ? tmp : THROW_CCE()) - get_S().k8_1) / 1000.0;
      if (away > 60.0) {
        var capH = get_S().d8_1 > 0 ? Bal_getInstance().e7_1[get_S().d8_1 - 1 | 0] : 0.5;
        var eff = 0.5 * (get_S().z7_1 >= 9 ? 2.0 : 1.0);
        // Inline function 'kotlin.math.min' call
        var b = capH * 3600.0;
        var secs = Math.min(away, b);
        if (secs > 0.0 && get_S().l8_1 > 0.0) {
          var gain = get_S().l8_1 * secs * eff;
          var _receiver__tnumb7 = get_S();
          _receiver__tnumb7.t7_1 = _receiver__tnumb7.t7_1 + gain;
          var _receiver__tnumb7_0 = get_S();
          _receiver__tnumb7_0.u7_1 = _receiver__tnumb7_0.u7_1 + gain;
          var _receiver__tnumb7_1 = get_S();
          _receiver__tnumb7_1.v7_1 = _receiver__tnumb7_1.v7_1 + gain;
          win().setTimeout(main$lambda(gain), 900);
        }
      }
    }
    var inductionVariable = 0;
    if (inductionVariable < 15000)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        Eng_getInstance().h9(Engine_getInstance().t9_1, i, 0.0, Eng_getInstance().c9_1);
        var j = imul(i, 3);
        Eng_getInstance().t8_1[j] = Eng_getInstance().c9_1[0];
        Eng_getInstance().t8_1[j + 1 | 0] = Eng_getInstance().c9_1[1];
        Eng_getInstance().t8_1[j + 2 | 0] = Eng_getInstance().c9_1[2];
      }
       while (inductionVariable < 15000);
    var inductionVariable_0 = 0;
    if (inductionVariable_0 < 45000)
      do {
        var k = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        get_posF32()[k] = Eng_getInstance().t8_1[k];
      }
       while (inductionVariable_0 < 45000);
    E('introsub').textContent = '15,000 PARTICLES \xB7 A PARTICLE IDLE GAME \xB7 BUILT WITH KOTLIN';
    win().addEventListener('resize', main$lambda_0);
    resize();
    setupTabs();
    buildSpectrumRows();
    buildShopRows();
    panelShow('swarm');
    E('bp1').addEventListener('click', main$lambda_1);
    E('bp10').addEventListener('click', main$lambda_2);
    E('bpMax').addEventListener('click', main$lambda_3);
    E('bl1').addEventListener('click', main$lambda_4);
    E('blMax').addEventListener('click', main$lambda_5);
    E('saveBtn').addEventListener('click', main$lambda_6);
    E('wipeBtn').addEventListener('click', main$lambda_7);
    E('gatherBtn').addEventListener('click', main$lambda_8);
    get_canvas().addEventListener('pointerdown', main$lambda_9);
    win().addEventListener('visibilitychange', main$lambda_10);
    win().setInterval(main$lambda_11, 5000);
    refreshUI();
    win().requestAnimationFrame(main$lambda_12);
  }
  function initGl$mkShader(type, src) {
    var s = get_gl().createShader(type);
    get_gl().shaderSource(s, src);
    get_gl().compileShader(s);
    var tmp = get_gl().getShaderParameter(s, get_gl().COMPILE_STATUS);
    if (!((!(tmp == null) ? typeof tmp === 'boolean' : false) ? tmp : THROW_CCE())) {
      win().console.log(get_gl().getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  function backE$lambda($k) {
    return function (p) {
      var q = p - 1.0;
      return 1.0 + ($k + 1.0) * q * q * q + $k * q * q;
    };
  }
  function toast$lambda($d) {
    return function (_unused_var__etf5q3) {
      return $d.classList.add('bye');
    };
  }
  function toast$lambda_0($d) {
    return function (_unused_var__etf5q3) {
      return $d.remove();
    };
  }
  function buildSpectrumRows$lambda($band) {
    return function (_unused_var__etf5q3) {
      var res = buyBand(get_S(), $band);
      var tmp;
      if (res === 2) {
        toast('CHROMATIC RESONANCE \xB7 +1 LIGHT LEVEL');
        tmp = Unit_instance;
      }
      refreshUI();
      saveGame();
      return Unit_instance;
    };
  }
  function addShopRow$lambda($onClick) {
    return function (_unused_var__etf5q3) {
      $onClick();
      refreshUI();
      saveGame();
      return Unit_instance;
    };
  }
  function buildShopRows$lambda() {
    _init_properties_web_kt__le8mgy();
    buyShop(get_S(), 'ref');
    return Unit_instance;
  }
  function buildShopRows$lambda_0(r) {
    _init_properties_web_kt__le8mgy();
    var lvl = get_S().b8_1;
    var c = shopCost('ref', lvl);
    r.ua_1.textContent = '\xD71.25 production / level' + (lvl > 0 ? ' \xB7 level ' + lvl : '');
    r.sa_1.disabled = c < 0.0 || get_S().a8_1 < c;
    r.ta_1.textContent = c < 0.0 ? 'MAX' : '\u25C6 ' + fmt(c);
    return Unit_instance;
  }
  function buildShopRows$lambda_1() {
    _init_properties_web_kt__le8mgy();
    buyShop(get_S(), 'head');
    return Unit_instance;
  }
  function buildShopRows$lambda_2(r) {
    _init_properties_web_kt__le8mgy();
    var lvl = get_S().c8_1;
    var c = shopCost('head', lvl);
    r.ua_1.textContent = '+25 starting particles / level' + (lvl > 0 ? ' \xB7 level ' + lvl : '');
    r.sa_1.disabled = c < 0.0 || get_S().a8_1 < c;
    r.ta_1.textContent = c < 0.0 ? 'MAX' : '\u25C6 ' + fmt(c);
    return Unit_instance;
  }
  function buildShopRows$lambda_3() {
    _init_properties_web_kt__le8mgy();
    buyShop(get_S(), 'after');
    return Unit_instance;
  }
  function buildShopRows$lambda_4(r) {
    _init_properties_web_kt__le8mgy();
    var lvl = get_S().d8_1;
    var c = shopCost('after', lvl);
    var cap = lvl > 0 ? Bal_getInstance().e7_1[lvl - 1 | 0] : 0.5;
    r.ua_1.textContent = 'offline production cap: ' + (isInfinite(cap) ? '\u221E' : fmt(cap) + 'h');
    r.sa_1.disabled = c < 0.0 || get_S().a8_1 < c;
    r.ta_1.textContent = c < 0.0 ? 'MAX' : '\u25C6 ' + fmt(c);
    return Unit_instance;
  }
  function buildShopRows$lambda_5() {
    _init_properties_web_kt__le8mgy();
    buyShop(get_S(), 'mom');
    return Unit_instance;
  }
  function buildShopRows$lambda_6(r) {
    _init_properties_web_kt__le8mgy();
    var lvl = get_S().e8_1;
    var c = shopCost('mom', lvl);
    var tmp = Bal_getInstance().l7_1;
    // Inline function 'kotlin.math.min' call
    var b = Bal_getInstance().l7_1.length - 1 | 0;
    var cap = tmp[Math.min(lvl, b)];
    r.ua_1.textContent = '+2%/min since gather, cap ' + fmtMult(cap) + (lvl > 0 ? ' \xB7 level ' + lvl : '');
    r.sa_1.disabled = c < 0.0 || get_S().a8_1 < c;
    r.ta_1.textContent = c < 0.0 ? 'MAX' : '\u25C6 ' + fmt(c);
    return Unit_instance;
  }
  function buildShopRows$lambda_7() {
    _init_properties_web_kt__le8mgy();
    buyAuto(get_S(), 'autoP');
    return Unit_instance;
  }
  function buildShopRows$lambda_8(r) {
    _init_properties_web_kt__le8mgy();
    r.ua_1.textContent = get_S().f8_1 ? 'ONLINE' : 'auto-buys particles when affordable';
    r.sa_1.disabled = get_S().f8_1 || get_S().a8_1 < 25;
    r.ta_1.textContent = get_S().f8_1 ? 'ACTIVE' : '\u25C6 25';
    return Unit_instance;
  }
  function buildShopRows$lambda_9() {
    _init_properties_web_kt__le8mgy();
    buyAuto(get_S(), 'autoL');
    return Unit_instance;
  }
  function buildShopRows$lambda_10(r) {
    _init_properties_web_kt__le8mgy();
    r.ua_1.textContent = get_S().g8_1 ? 'ONLINE' : 'auto-buys light levels when affordable';
    r.sa_1.disabled = get_S().g8_1 || get_S().a8_1 < 75;
    r.ta_1.textContent = get_S().g8_1 ? 'ACTIVE' : '\u25C6 75';
    return Unit_instance;
  }
  function buildShopRows$lambda_11() {
    _init_properties_web_kt__le8mgy();
    buyAuto(get_S(), 'autoS');
    return Unit_instance;
  }
  function buildShopRows$lambda_12(r) {
    _init_properties_web_kt__le8mgy();
    r.ua_1.textContent = get_S().h8_1 ? 'ONLINE' : 'auto-buys spectrum bands when affordable';
    r.sa_1.disabled = get_S().h8_1 || get_S().a8_1 < 225;
    r.ta_1.textContent = get_S().h8_1 ? 'ACTIVE' : '\u25C6 225';
    return Unit_instance;
  }
  function setupTabs$lambda($btn, $n, $btns) {
    return function (_unused_var__etf5q3) {
      var tmp = $btn.dataset.t;
      set_curTab((!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE());
      var inductionVariable = 0;
      var tmp_0;
      if (inductionVariable < $n) {
        do {
          var j = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var bj = $btns[j];
          bj.className = bj == $btn ? 'on' : '';
        }
         while (inductionVariable < $n);
        tmp_0 = Unit_instance;
      }
      panelShow(get_curTab());
      refreshUI();
      return Unit_instance;
    };
  }
  function frame$lambda(n) {
    _init_properties_web_kt__le8mgy();
    frame(n);
    return Unit_instance;
  }
  function main$lambda($gain) {
    return function (_unused_var__etf5q3) {
      toast('WHILE YOU WERE AWAY \xB7 +' + fmt($gain) + ' LIGHT');
      return Unit_instance;
    };
  }
  function main$lambda_0(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    resize();
    return Unit_instance;
  }
  function main$lambda_1(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    buyParticles(get_S(), 1);
    refreshUI();
    saveGame();
    return Unit_instance;
  }
  function main$lambda_2(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    buyParticles(get_S(), 10);
    refreshUI();
    saveGame();
    return Unit_instance;
  }
  function main$lambda_3(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    buyParticles(get_S(), maxParticlesAfford(get_S().w7_1, get_S().t7_1));
    refreshUI();
    saveGame();
    return Unit_instance;
  }
  function main$lambda_4(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    buyLight(get_S(), 1);
    refreshUI();
    saveGame();
    return Unit_instance;
  }
  function main$lambda_5(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    buyLight(get_S(), maxLightAfford(get_S().x7_1, get_S().t7_1));
    refreshUI();
    saveGame();
    return Unit_instance;
  }
  function main$lambda_6(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    saveGame();
    toast('SAVED');
    return Unit_instance;
  }
  function main$lambda_7(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    if (win().confirm('Wipe your swarm? All shapes, prisms and light will be lost.') == true) {
      store().removeItem('flutterlight_kt_v1');
      set_S(new GameState());
      Engine_getInstance().t9_1 = 'sphere';
      Engine_getInstance().ba_1 = -1;
      Blend_getInstance().i9_1 = false;
      cerOff();
      toast('THE VOID RESETS');
      refreshUI();
      saveGame();
    }
    return Unit_instance;
  }
  function main$lambda_8(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    if (canGather(get_S())) {
      var gained = doGather(get_S());
      var sh = get_SHAPES().i(get_S().z7_1);
      if (sh.o7_1 === 'heart') {
        Eng_getInstance().e9();
      }
      Engine_getInstance().ca_1 = sh.o7_1;
      Engine_getInstance().ba_1 = 0;
      Engine_getInstance().da_1 = 0.0;
      cerOn(sh.p7_1, 'GATHERED \xB7 ' + fmtMult(sh.r7_1) + ' \u2014 ' + sh.q7_1);
      toast('+' + fmt(gained) + ' PRISMS');
      refreshUI();
      saveGame();
    }
    return Unit_instance;
  }
  function main$lambda_9(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    var inc = incomeOf(get_S(), get_S().i8_1);
    // Inline function 'kotlin.math.max' call
    var gain = Math.max(10.0, inc);
    var _receiver__tnumb7 = get_S();
    _receiver__tnumb7.t7_1 = _receiver__tnumb7.t7_1 + gain;
    var _receiver__tnumb7_0 = get_S();
    _receiver__tnumb7_0.u7_1 = _receiver__tnumb7_0.u7_1 + gain;
    var _receiver__tnumb7_1 = get_S();
    _receiver__tnumb7_1.v7_1 = _receiver__tnumb7_1.v7_1 + gain;
    Engine_getInstance().z9_1 = 0.8;
    return Unit_instance;
  }
  function main$lambda_10(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    if (doc().hidden == true) {
      saveGame();
    }
    return Unit_instance;
  }
  function main$lambda_11(_unused_var__etf5q3) {
    _init_properties_web_kt__le8mgy();
    saveGame();
    return Unit_instance;
  }
  function main$lambda_12(n) {
    _init_properties_web_kt__le8mgy();
    frame(n);
    return Unit_instance;
  }
  var properties_initialized_web_kt_pcdqec;
  function _init_properties_web_kt__le8mgy() {
    if (!properties_initialized_web_kt_pcdqec) {
      properties_initialized_web_kt_pcdqec = true;
      TAU = 2.0 * 3.141592653589793;
      S = new GameState();
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      BANDNAMES = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
      // Inline function 'kotlin.doubleArrayOf' call
      BANDHUES = new Float64Array([0.0, 0.08, 0.16, 0.3, 0.44, 0.6, 0.72]);
      VSH = '\nprecision highp float;\nattribute vec3 aPos;\nattribute vec4 aSeed;\nuniform mat4 uProj;\nuniform float uAz, uEl, uDist, uTime, uHue, uSat, uLight, uBright, uSize, uScale;\nvarying vec3 vColor;\nvarying float vAlpha;\nvec3 hsl2rgb(float h, float s, float l) {\n  vec3 rgb = clamp(abs(mod(h*6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\n  return l + s*(rgb - 0.5)*(1.0 - abs(2.0*l - 1.0));\n}\nvoid main() {\n  float cy = cos(uAz), sy = sin(uAz), cx = cos(uEl), sx = sin(uEl);\n  float x1 =  cy*aPos.x + sy*aPos.z;\n  float z1 = -sy*aPos.x + cy*aPos.z;\n  float y1 =  cx*aPos.y - sx*z1;\n  float z2 =  sx*aPos.y + cx*z1;\n  gl_Position = uProj * vec4(x1, y1, z2 - uDist, 1.0);\n  float viewZ = max(0.3, uDist - z2);\n  float twk = 0.72 + 0.28*sin(uTime*(1.2 + 2.2*fract(aSeed.z*7.31)) + aSeed.z*61.7);\n  gl_PointSize = min(uSize*uScale*(0.5 + 0.9*aSeed.y)*twk*6.0/viewZ, 48.0);\n  float h = fract(uHue + 0.09*aPos.y + 0.06*aPos.x + 0.14*aSeed.x + uTime*0.012);\n  vColor = hsl2rgb(h, uSat, uLight) * uBright;\n  vAlpha = 0.55 + 0.45*twk;\n}\n';
      FSH = '\nprecision mediump float;\nvarying vec3 vColor;\nvarying float vAlpha;\nvoid main() {\n  vec2 c = gl_PointCoord - 0.5;\n  float d = length(c) * 2.0;\n  float a = max(0.0, 1.0 - d);\n  a *= a;\n  gl_FragColor = vec4(vColor, a * vAlpha);\n}\n';
      canvas = null;
      gl = null;
      posBuf = null;
      seedBuf = null;
      starBuf = null;
      starSeedBuf = null;
      posF32 = null;
      seedF32 = null;
      starF32 = null;
      starSeedF32 = null;
      projF32 = null;
      APOS = null;
      ASEED = null;
      uProj = null;
      uAz = null;
      uEl = null;
      uDist = null;
      uTime = null;
      uHue = null;
      uSat = null;
      uLight = null;
      uBright = null;
      uSize = null;
      uScale = null;
      distFactor = 1.0;
      Wc = 0;
      Hc = 0;
      bandRows = ArrayList_init_$Create$();
      shopRows = ArrayList_init_$Create$();
      curTab = 'swarm';
      acc = 0.0;
      uiAcc = 0.0;
      lastNow = 0.0;
      rafStarted = false;
    }
  }
  function mainWrapper() {
    main();
  }
  mainWrapper();
  return _;
}));

//# sourceMappingURL=flutterlight-shared.js.map
