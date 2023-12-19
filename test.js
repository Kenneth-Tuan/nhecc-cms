function convertToMeters(value, unit) {
  return new Decimal(value).times(
    lengthConversionFactors[unit.toLocaleLowerCase()]
  );
}

function calculateVolume({
  length,
  width,
  height,
  pieces,
  lengthUnit,
  volumeUnit,
}) {
  if ([length, width, height, pieces].some((i) => !i)) return;

  const lengthMeter = convertToMeters(length, lengthUnit);
  const widthMeter = convertToMeters(width, lengthUnit);
  const heightMeter = convertToMeters(height, lengthUnit);

  const volume = lengthMeter
    .times(widthMeter)
    .times(heightMeter)
    .times(volumeConversionFactors[volumeUnit.toLocaleLowerCase()]);

  return volume.times(pieces).toNumber();
}

const totalVolumeOfDimensions = computed(() =>
  dimensions.rows
    .map((dimension) => {
      const { length, width, height, pieces } = dimension;
      return calculateVolume({
        length,
        width,
        height,
        pieces,
        lengthUnit: dimensions.lengthUnit,
        volumeUnit: dimensions.volumeUnit,
      });
    })
    .reduce((acc, cur) => (acc += cur ?? 0))
);

const totalVolumeWeightOfDimensions = computed(() => {
  if (dimensions.volumeUnit === VolumeUnitEnum.MC)
    return totalVolumeOfDimensions.value / 0.006;
  else if (dimensions.volumeUnit === VolumeUnitEnum.CF) {
  } else if (dimensions.volumeUnit === VolumeUnitEnum.CC) {
  } else if (dimensions.volumeUnit === VolumeUnitEnum.CI) {
  }
});
