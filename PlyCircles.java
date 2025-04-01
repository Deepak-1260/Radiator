import java.util.*;

public class PlyCircles {
    public static int play(double radius) {
        double pitchArea = 613660 ;
        double circleArea = Math.PI * radius * radius;
        return (int) (pitchArea / circleArea);
    }

    public static int play(double radius, boolean food) {
        double pizzaArea = 729.3;
        double circleArea = Math.PI * radius * radius;
        return (int) (pizzaArea / circleArea);
    }

    public static int play(int length) {
        int distance = 367600000;
        return distance / length;
    }

    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Please provide the type and value.");
            return;
        }

        String type = args[0];
        switch (type) {
            case "cricket":
                double radius = Double.parseDouble(args[1]);
                int cricketCircles = play(radius);
                System.out.println("Number of circles to fill the cricket pitch: " + cricketCircles);
                break;
            case "foodie":
                radius = Double.parseDouble(args[1]);
                int pizzaCircles = play(radius, true);
                System.out.println("Number of circles to fill the pizza: " + pizzaCircles);
                break;
            case "tourist":
                int length = Integer.parseInt(args[1]);
                int touristLengths = play(length);
                System.out.println("Number of Circles equal to the distance between Kashmir to Kanyakumari: " + touristLengths);
                break;
            default:
                System.out.println("Invalid type provided.");
        }
    }
}
