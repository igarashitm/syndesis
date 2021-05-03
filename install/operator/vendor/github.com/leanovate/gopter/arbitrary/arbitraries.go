package arbitrary

import (
	"reflect"
	"time"

	"github.com/leanovate/gopter"
	"github.com/leanovate/gopter/gen"
)

// Arbitraries defines a context to generate arbitrary values of any kind.
// Values are generated by either providing a generator for a specific type
// or by creating a generator on the fly using golang reflection.
type Arbitraries struct {
	generators map[reflect.Type]gopter.Gen
}

// DefaultArbitraries creates a default arbitrary context with the widest
// possible ranges for all types.
func DefaultArbitraries() *Arbitraries {
	return &Arbitraries{
		generators: map[reflect.Type]gopter.Gen{
			reflect.TypeOf(time.Time{}):  gen.Time(),
			reflect.TypeOf(&time.Time{}): gen.PtrOf(gen.Time()),
		},
	}
}

// GenForType gets a generator for a generator for a type
func (a *Arbitraries) GenForType(rt reflect.Type) gopter.Gen {
	if gen, ok := a.generators[rt]; ok {
		return gen
	}
	return a.genForKind(rt)
}

// RegisterGen registers a generator
func (a *Arbitraries) RegisterGen(gen gopter.Gen) {
	result := gen(gopter.MinGenParams)
	rt := result.ResultType
	a.generators[rt] = gen
}