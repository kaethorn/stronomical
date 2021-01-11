import { CoordinatesUtility, SexagesimalOrientation } from './coordinates.utility';

describe('CoordinatesUtility', () => {

  describe('#toDegrees', () => {

    it('converts coordinates to degress', () => {
      expect(CoordinatesUtility.toDegrees({
        accuracy: 45,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 47.5853312,
        longitude: 8.3092767,
        speed: null
      })).toEqual({
        latitude: {
          coordinate: {
            decimal: 47.5853312,
            degrees: 47,
            minutes: 35,
            seconds: 7
          },
          orientation: SexagesimalOrientation.North
        },
        longitude: {
          coordinate: {
            decimal: 8.3092767,
            degrees: 8,
            minutes: 18,
            seconds: 33
          },
          orientation: SexagesimalOrientation.East
        }
      })
    });
  });
});
