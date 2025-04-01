public class CircleRadiusCalculator {
    public double findRadius(double diameter) {
        return diameter / 2;
    }

    public double findRadius(double circumference, boolean isCircumference) {
        return circumference / (2 * Math.PI);
    }

    public double findRadius(double area, char type) {
        return Math.sqrt(area / Math.PI);
    }

    public double findRadius(double area, double angle) {
        return Math.sqrt((area * 360.0) / (angle * Math.PI));
    }
    
    public double findRadius(double sectorArea, double theta, boolean isSector) {
        return Math.sqrt((2.0 * sectorArea * 360.0) / (theta * Math.PI));
    }

    public static void main(String[] args) {
        CircleRadiusCalculator calculator = new CircleRadiusCalculator();
        double result = 0;
        String type = args[0];

        switch (type) {
            case "diameter":
                result = calculator.findRadius(Double.parseDouble(args[1]));
                break;
            case "circumference":
                result = calculator.findRadius(Double.parseDouble(args[1]), true);
                break;
            case "area":
                result = calculator.findRadius(Double.parseDouble(args[1]), 'A');
                break;
            case "area-angle":
                result = calculator.findRadius(Double.parseDouble(args[1]), Double.parseDouble(args[2]));
                break;
            case "sector-area":
                result = calculator.findRadius(Double.parseDouble(args[1]), Double.parseDouble(args[2]), true);
                break;
        }
        System.out.println(result);
    }
}
