<EventsArea
	columnsCount={5}
	events={[event1, event2, ...]}
	formatTickValue={Units.toShort}
	minorTicksCount={9}
	tickHeight={15}
	ticks={[new Date().getFullYear(), 0, -1e4, -1e6, -1e8, ...]} />
